const { MongoClient, ServerApiVersion } = require('mongodb');

// Hiding the password of the MongoDB cluster using the dotenv file config.envs
require("dotenv").config({ path: "./config.env" });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

module.exports = {

  // Creates the initial connection between the code and the database
  connectToServer: async () => {
    try {
      await client.connect();  // Ensure the connection is established
      console.log("Successfully connected to MongoDB.");
      database = client.db("userData");  // Select the database
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  },

  getDb: () => {
    return database;  // Returns the connected database
  }
};
