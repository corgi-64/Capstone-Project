const mongoose = require('mongoose');
const User = require('../src/backend/models/userSchema.js'); // Adjust path if needed

mongoose.connect('mongodb://127.0.0.1:27017/userDatabase', {
  serverSelectionTimeoutMS: 5000
})
.then(async () => {
  console.log("Connected to MongoDB!");

  const username = 'testuser';

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log("User already exists:", existingUser);
    } else {
      const newUser = new User({
        username: username,
        email: 'user@example.com',
        password: 'securepassword123',
        age: 25,
        survey: {
          selectedGenres: ["Action", "Adventure", "Western"],
          movie_length: "90-120 minutes",
          period: "2010-2020",
          preferred_language: "English"
        }
      });

      await newUser.save();
      console.log("Inserted new user:", newUser);
    }
  } catch (err) {
    console.error("Query or Save Error:", err);
  }

  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB.");
})
.catch((err) => console.error("Database connection error:", err));
