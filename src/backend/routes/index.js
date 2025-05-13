const express = require("express");
const router = express.Router();

const userRoutes = require("../server")

router.use("/user", userRoutes)