const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6,
        max :255
    },
    email : {
        type : String,
        required : true,
        min : 6,
        max :255
    },
    password : {
        type : String,
        required : true,
        min : 8,
        max :1024
    },
    date : {
        type : String,
        default : Date.now
    }
})

module.exports = mongoose.model("Users", userSchema)