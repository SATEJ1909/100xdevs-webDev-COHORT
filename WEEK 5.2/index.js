const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())

app.post("/sum" , function(req,res){
    let a = (req.body.a);
    let b = (req.body.b);

    res.json({
        answer: a+b 
    })
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
});