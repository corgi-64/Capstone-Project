const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userSchema"); // Mongoose model
const userRoutes = express.Router();

// 1 - Retrieve All Users
// GET http://localhost:3003/users
userRoutes.get("/", async (req, res) => { // GET /users
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2 - Retrieve One User by ID
// GET http://localhost:3003/users/:id
userRoutes.get("/:id", async (req, res) => {  // GET /users/:id
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3 - Create New User
// POST http://localhost:3003/users
userRoutes.post("/", async (req, res) => { // POST /users
  try {
    const { email, username, password, age } = req.body;
    const newUser = new User({ email, username, password, age });
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// 4 - Update User by ID
// PUT http://localhost:3003/users/:id
userRoutes.put("/users/:id", async (req, res) => {
  try {
    const { email, username, password, age } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { email, username, password, age },
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// 5 - Delete User by ID
// DELETE http://localhost:3003/users/:id
userRoutes.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = userRoutes;