require('dotenv').config()
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "akhdabfa";

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token , JWT_ADMIN_PASSWORD);

    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(404).json({
            message : "you are not signed in "
        })
    }
}

module.exports = {
    adminMiddleware : adminMiddleware
}