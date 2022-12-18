const { json } = require("express");
const express =  require("express");
const mongoose =  require("mongoose"); // For Database
require("dotenv").config() // For .env
const app = express()
const userRoute = require("./routes/auth");
const postRoute = require("./routes/post");
var cors = require('cors') // To enable cors

app.use(express.json()) // To parse json file
app.use(cors()) // To enable cors

app.use("/api/", userRoute) // api Routes for sign in and register
app.use("/api/", postRoute) // api Routes for apis

mongoose.connect(process.env.Mongo_URI, () => {
    console.log("DBS connect")
})

app.listen(3030, () => console.log("Listening"))

//mongodb+srv://DBS_name:YqPIPS3eHiu6gfjo@cluster0.msaukgy.mongodb.net/?retryWrites=true&w=majority