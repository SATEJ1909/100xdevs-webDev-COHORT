// Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

const express = require("express");
const app = express();

let count = 0;

//the middleware that counts the total number of requests
app.use(function(req,res,next){
    count++;
    console.log("Total number of requests: "+ count);
    next();
})

app.get("/sum", function(req, res) {
    let a = req.query.a;
    let b = req.query.b;

    res.json({ result: parseInt(a) + parseInt(b) });
});

app.get("/multiply", function(req, res) {
    let a = req.query.a;
    let b = req.query.b;


    res.json({ result: parseInt(a) * parseInt(b) });
});

app.get("/divide", function(req, res) {
    let a = req.query.a;
    let b = req.query.b;

    res.json({ result: parseInt(a) / parseInt(b) });

});

app.get("/subtract", function(req, res) {
    let a = req.query.a;
    let b = req.query.b;
    res.json({ result: parseInt(a) - parseInt(b) });
});

app.get("/totalrequests" , function(req,res){
    res.json({
        result : count
    })
});

app.listen(5000 ,function(req, res) {
    console.log("Server is running on port 5000")
});