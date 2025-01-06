//a sipmple project using authentication 
const express = require('express');

const jwt = require('jsonwebtoken');

const JWT_SECRET = "satejwillsuccesful";

const app = express();

app.use(express.json());

const users = [];

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}


app.post("/signup" , function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.send({
        message : "you have signed up"
    })
})


app.post("/signin", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username
    && user.password === password);


    if(user){
        const token = jwt.sign({
            username:user.username
        }, JWT_SECRET);
        // user.token = token;
        res.send({
            token: token
        })
        console.log(users);
    }else{
        res.status(403).send({
            message: "invalid username or password"
        })
    }

})

app.get("/me", function (req, res) {
    try {
        const token = req.headers.token;

        // Verify and decode the token
        const decodedInfo = jwt.verify(token, JWT_SECRET);

        // Extract username from decoded token
        const username = decodedInfo.username;

        // Find the user by username
        const founduser = users.find(user => user.username === username);

        if (founduser) {
            res.json({
                username: founduser.username,
                password: founduser.password
            });
        } else {
            res.status(403).send({
                message: "Invalid token"
            });
        }
    } catch (err) {
        res.status(403).send({
            message: "Invalid token or token expired"
        });
    }
});



app.listen(2000, function(){
    console.log("server started");
});