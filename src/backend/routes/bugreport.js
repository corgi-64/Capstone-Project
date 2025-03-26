const express = require("express");
const router = express.Router();
const BugReport = require('../models/bugreport'); // Make sure to use the correct model name (camelCase or PascalCase)




router.post('/bugreport', async (req, res, next) => {
    console.log('test')
    try {
        // Create a new bug report instance and set the properties
        const newBugReport = new BugReport({
            title: req.body.title,
            description: req.body.description,
            issue: req.body.issue,
            message: req.body.message,
            // Add any other fields from the request body as necessary
        });

        // Save the bug report to MongoDB
        await newBugReport.save();

        // Respond with a success message
        res.status(201).json({
            message: "Bug report submitted successfully",
            bugReport: newBugReport
        });
    } catch (error) {
        console.error("Error in submitting bug report:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;
