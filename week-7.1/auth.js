const jwt = require("jsonwebtoken");
const JWT_SECRET = "satej";

function auth(req,res,next){
    const token = req.headers.token;
    
    const response = jwt.verify(token , JWT_SECRET);

    if(response){
        req.userid = response.id;
        next();
    }else{
        res.status(401).json({
            message : "Incorrect credentials"
        })
    }
 }

 module.exports = {
    auth,
    JWT_SECRET
 }
