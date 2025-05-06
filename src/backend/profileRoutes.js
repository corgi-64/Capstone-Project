const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId

let profileRoutes = express.Router()

//route all users
profileRoutes.route("/profile").get(async (request, response) => {
    let pdb = database.getPDb()
    let data = await pdb.collection("users").find({}).toArray()

    if(data.length > 0){
        response.json(data)
    } else{
        throw new Error("User data was not found :( ")
    }
})

//route single user
//http://localhost:3003/register/:id
profileRoutes.route("/profile/:id").get(async (request, response) => {
    let pdb = database.getPDb()
    let data = await pdb.collection("users").findOne({_id: new ObjectId(request.params.id)})

    if(Object.keys(data).length > 0){
        response.json(data)
    } else{
        throw new Error("User data was not found :( ")
    }
})

module.exports = profileRoutes