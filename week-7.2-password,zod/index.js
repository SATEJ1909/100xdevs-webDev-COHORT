
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {UserModel , TodoModel} = require("./db");
const {auth , JWT_SECRET} = require("./auth");
const { z } = require('zod');
mongoose.connect("mongodb+srv://satejniswade:satej123@cluster0.qb1hk.mongodb.net/todo-app-database")


app.use(express.json());

app.post("/signup" , async function(req,res){

    const requiredBody = z.object({
        name : z.string().min(5).max(50),
        email : z.string().min(5).max(50).email(),
        password : z.string().min(5).max(50),
    })

    const parsewithDatasucces = requiredBody.safeParse(req.body);

    if(!parsewithDatasucces){
        res.json({
            status : "failed",
        })
    }

    try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password , 10);

    await UserModel.create({
        name : name,
        email : email,
        password : hashedPassword
    })

    res.json({
        message : "user created successfully"
    })
}
catch(e){
    res.json({
        message : "error"
    })
}
})

app.post("/signin", async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email : email
    })

    const passwordMatched = bcrypt.compare(password, response.password);

    if(response && passwordMatched){
        const token = jwt.sign({
            id : response._id.toString()
        } , JWT_SECRET);

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message : "invalid credentials"
        })
    }
});


app.post("/todo" , auth ,async function(req,res){

    const userid = req.userid ;
    const description = req.body.description;
    const done = req.body.done;

    await TodoModel.create({
        userid : userid,
        description : description,
        done : done
    });

    res.json({
        message : "todo created" 
    })
});



app.get("/todos" , auth ,  async function(req,res){
    const userid = req.userid ;

    const todos = await TodoModel.find({
        userid 
    });

    res.json({
        todos
    })
});


app.listen(4000, function(req,res){
    console.log("server running on the port 4000")
});