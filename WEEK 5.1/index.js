//basic http server using express

const express = require("express");

const app = express();

//create a  middleware tha logs the request url , timestamp and request method

app.use(function(req,res,next){
    console.log("Method is "+ req.method);
    console.log("Url is "+ req.url);
    console.log("Timestamp is "+ new Date());
    next();
})

app.get("/sum/:a/:b", function(req, res) {
    let a = req.params.a;
    let b = req.params.b;

    res.json({ result: parseInt(a) + parseInt(b) });
});

app.get("/multiply/:a/:b", function(req, res) {
    let a = req.params.a;
    let b = req.params.b;

    res.json({ result: parseInt(a) * parseInt(b) });
});

app.get("/divide/:a/:b", function(req, res) {
    let a = req.params.a;
    let b = req.params.b;

    res.json({ result: parseInt(a) / parseInt(b) });

});

app.get("/subtract/:a/:b", function(req, res) {
    let a = req.params.a;
    let b = req.params.b;
    res.json({ result: parseInt(a) - parseInt(b) });
});

app.listen(5000 ,function(req, res) {
    console.log("Server is running on port 5000")
});