const express = require('express');
const cors = require('cors');
const bugReportController = require("./controllers/bugReportController");
const { connectToServer } = require("./connect"); // Adjust path to where your connect.js file is located

const app = express();

connectToServer();
// Enable CORS for the specific origin (React app)
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Your other server configurations go here

app.use(express.json());  // For parsing application/json


app.post('/bugreport', bugReportController.updateBugReport);

/*app.post('/bugreport', (req, res) => {
  // Handle form submission
  bugReportController.updateBugReport;
  console.log('skibb')
  res.status(200).send('Bug report submitted successfully');
});
*/
// Listen on port 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
