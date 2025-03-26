const BugReport = require("../models/bugreport");

exports.updateBugReport = async (req, res, next) => {
    try {
        console.log("Form Data:", req.body); // Log the form fields (name, email, issue, etc.)
        console.log("Uploaded File:", req.file); // Log the uploaded file
  
        // Create a new bug report instance
        const newBugReport = new BugReport({
          title: req.body.name,
          email: req.body.email,
          issue: req.body.issue,
          reproduceIssue: req.body.message,
          file: req.file ? req.file.path : null, // Save the file path if a file was uploaded
        });
        console.log(newBugReport.title + "title");
        console.log(newBugReport.email + "email");
        console.log(newBugReport.issue + "issue");

        // Save the bug report to MongoDB
        await newBugReport.save();
    
        // Respond with success
        res.status(201).json({
          message: 'Bug report submitted successfully',
          bugReport: newBugReport
        });
      } catch (error) {
        console.error('Error in submitting bug report:', error);
        res.status(500).json({
          error: 'Internal server error'
        });
      }
};
