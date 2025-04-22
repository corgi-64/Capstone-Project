const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId

let ProfileRoutes = express.Router()

ProfileRoutes.route("/register/:id").get(async (request, response) => {
    let pdb = database.getPDb()
    let data = await pdb.collection("users").findOne({_id: new ObjectId(request.params.id.toString().trim())})

    if(Object.keys(data).length > 0){
        response.json(data)
    } else{
        throw new Error("User data was not found :( ")
    }
})

module.exports = ProfileRoutes