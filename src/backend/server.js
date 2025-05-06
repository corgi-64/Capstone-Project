const express = require('express'); // setups server
const mongoose = require('mongoose'); // makes it easy to connect to MongoDB and make schemas
const cors = require('cors'); // Helps minimize errors when connecting to the database or API
const bcrypt = require('bcryptjs'); // hash passwords
const jwt = require('jsonwebtoken'); // follows the user for the session
const multer = require('multer');
const bugReportController = require('./controllers/bugReportController');
const BookController = require('./controllers/BookController');
const UserController = require('./controllers/UserController');
const MovieController = require('./controllers/MovieController');
const User = require('./models/userSchema'); // to use user schema

// *** UserRoutes file
const users = require('./userRoutes');

require('dotenv').config({ path: './config.env' });

const SECRET_KEY = process.env.SECRET_KEY; // get the secret key from .env

// Connect to express app
const app = express();

// Middleware for JSON and URL-encoded data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *** User Routes
app.use('/users', users);

// *** Enable CORS for Frontend
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// MongoDB Connection using mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');

    // Start the server after successful DB connection
    app.listen(3003, () => {
      console.log('✅ Server running on http://localhost:3003');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if DB connection fails
  });

// REGISTER Route
app.post('/register', async (req, res) => {
  try {
    const { email, username, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword, age });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Error signing up' });
  }
});

// GET Users Route
app.get('/users', async (req, res) => {
  try {
    // Fetch a maximum of 50 users to prevent overload
    const users = await User.find({}).limit(50);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET User by ID Route
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// LOGIN Route
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });
    res.json({ message: 'Login successful', userId: user._id, name: user.username });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Store files in the 'uploads' folder

// Debugging middleware
app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  console.log('Request Body:', req.body); // Log form fields
  console.log('Uploaded File:', req.file); // Log uploaded file
  next();
});

// Route for Bug Report sends file data to controllers folder bugReportController.js to process the data and do specific actions
app.post('/bugreport', upload.single('file'), bugReportController.updateBugReport);

// Other Routes for Movie, Book, User Profile, etc...
app.post('/want-to-watch', MovieController.MovieAdd);
app.get('/:username/movies', MovieController.getUserMovie);

app.post('/want-to-read', BookController.BookAdd);
app.get('/:username/books', BookController.getUserBook);

app.get('/user/profile-picture/:userId', UserController.userProfileGet);
app.get('/user/profile-banner/:userId', UserController.userBannerGet);

// Update User Profile (Banner and Profile Picture)
app.put(
  '/user-banner',
  upload.fields([{ name: 'profile_picture', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }]),
  UserController.UserProfileAdd
);

// PUT Survey
app.put('/user/survey/:userId', async (req, res) => {
  const { userId } = req.params;
  const surveyData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { survey: surveyData }, { new: true });
    res.status(200).json({ message: 'Survey updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating survey:', error);
    res.status(500).json({ error: 'Failed to update survey' });
  }
});