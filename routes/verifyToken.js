const JWT = require("jsonwebtoken") // For Handling JWT


module.exports = function(req, res, next) {
    const token = req.header("auth-token")
    if(!token) return res.status(401).send("Access-Denied")

    try{
        const verified = JWT.verify(token, process.env.TOKEN)
        req.user = verified
        next();
    } catch(err) {
        res.status(400).send({"error":"Invalid User"})
    }
}