// seeduser.js
const mongoose = require('mongoose');
const User = require('./src/backend/models/userSchema'); // Adjust path if needed

const mongoURI = 'mongodb://127.0.0.1:27017/userDatabase';

mongoose.connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB!");

    const newUser = new User({
      username: 'testuser',
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

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  })
  .catch((err) => console.error("Database connection error:", err));
