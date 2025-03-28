const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId

let userRoutes = express.Router()

//1 - Retrieve All
//http://localhost:3000/users
userRoutes.route("/users").get(async (request, response) => {

  let db = database.getDb()
  //calling an empty object to show all users
  let data = await db.collection("users").find({}).toArray()

  if(data.length > 0){
    response.json(data)
  } else {
    throw new Error("Data was not found :( ")
  }
})

//2 - Retrieve One
userRoutes.route("/users/:id").get(async (request, response) => {

  let db = database.getDb()
  //Finding one user
  let data = await db.collection("users").findOne({_id: new ObjectId(request.params.id)})

  if(Object.keys(data).length > 0){
    response.json(data)
  } else {
    throw new Error("Data was not found :( ")
  }
})

//3 - Create One
userRoutes.route("/users").post(async (request, response) => {

  let db = database.getDb()
  let mongoObject = {
    username: request.body.username,
    password: request.body.password
  }

  //Finding one user
  let data = await db.collection("users").insertOne(mongoObject)

  response.json(data)
})

//4 - Update One
userRoutes.route("/users/:id").put(async (request, response) => {

  let db = database.getDb()
  let mongoObject = {
    $set: {
      username: request.body.username,
      password: request.body.password
    }
  }

  //Finding one user
  let data = await db.collection("users").updatetOne({_id: new ObjectId(request.params.id)}, mongoObject)

  response.json(data)
})

//5 - Delete One 
userRoutes.route("/users/:id").delete(async (request, response) => {

  let db = database.getDb()
  //Finding one user
  let data = await db.collection("users").deleteOne({_id: new ObjectId(request.params.id)})

  response.json(data)
})

module.exports = userRoutes 