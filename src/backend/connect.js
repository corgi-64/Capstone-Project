
const { MongoClient, ServerApiVersion } = require('mongodb');

//Hiding the password of the mongodb cluster using the dotenv file config.envs
require("dotenv").config({path: "./config.env"})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database 

module.exports = {

  //creates the initial connection between the code and the database
  connectToServer: () => {
    database = client.db("userData")
  },

  getDb: () => {
    return database
  }
}

/*
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/