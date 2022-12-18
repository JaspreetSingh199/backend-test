// Creating Routes
const router =  require("express").Router();
const { default: mongoose } = require("mongoose"); // Interacting with mongoose
const User = require("../models/User") // Import Model
const bcrypt = require("bcryptjs") // To protect password
const JWT = require("jsonwebtoken") // For Handling JWT
const {registerValidations, loginValidations} = require("../validations") // For Validations

router.get('/', (req,res) => {
    res.send("Listening")
})

router.post('/register', async (req,res) => {
    //Initialize user data validation
    const { error } = registerValidations(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // check if user exists through email
    const emailExist = await User.findOne({ email : req.body.email}) //checking in database
    if(emailExist) return res.status(400).send({"message":"User Exists"})

    const salt = await bcrypt.genSalt(10) // To generate salt for password
    const hasedpassword = await bcrypt.hash(req.body.password, salt) // To hash password using salt

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hasedpassword,
    })

    try {
        const savedUser = await user.save()
        // res.status(200).send(savedUser)
        res.status(200).send({"_id":savedUser._id})
    } catch(err){
        res.status(400).send({"error":err})
    }
});

router.post('/login', async (req,res) => {
    //Initialize user data validation
    // console.log(req.body)
    const { error } = loginValidations(req.body)
    console.log(error)
    if(error) return res.status(400).send(error.details[0].message)
    // // check if user exists through email
    const user = await User.findOne({ email : req.body.email}) //checking in database
    if(!user) return res.status(400).send({"message":"Invalid Email"})

    //Validation for password
    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send({"message":"Wrong Password"})
    // Create and send json web token
    const token = JWT.sign({"_id" : user._id}, process.env.TOKEN)
    res.header("auth-token",token).send({"token":token})

    
    
})

module.exports = router