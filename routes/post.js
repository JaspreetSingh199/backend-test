const router =  require("express").Router();
const verify = require("../routes/verifyToken") 
var fetchUrl = require("fetch").fetchUrl;

router.post("/search", verify, (req, res) => {
    fetchUrl("https://api.tvmaze.com/search/shows?q=" + req.body.title, function(error, meta, body){
        res.send(body)
    })
    // res.json({
    //     post : {
    //         title : "logged in"
    //     }
    // })
})

module.exports = router