const { Router } = require('express');
const { userModel } = require("../db")
const zod = require('zod');
const { z } = require('zod');
const bcrypt = require('bcrypt');

const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD} = require('../config')

userRouter.post("/signup", async function (req, res) {
    const requiredbody = z.object({
        email: z.string().email(),
        password: z.string(),
        FirstName: z.string(),
        LastName: z.string(),
    });

    const parsewithsucces = requiredbody.safeParse(req.body);

    if (!parsewithsucces.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsewithsucces.error.issues
        });
    }

    try {
        const { email, password, FirstName, LastName } = req.body;

        const hashedpassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedpassword,
            FirstName,
            LastName
        });

        res.status(201).json({
            message: "User signed up successfully"
        });
    } catch (e) {
        console.error(e); // Debugging
        res.status(500).json({
            message: "Error during sign-up",
            error: e.message
        });
    }
});


userRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                message: "Invalid credentials"
            });
        }

        // Compare password with hashed password
        const matchedPassword = await bcrypt.compare(password, user.password);

        if (matchedPassword) {
            // Generate a JWT token
            const token = jwt.sign(
                { id: user._id }, 
                JWT_USER_PASSWORD, 
            );

            res.status(200).json({
                token,
                message: "Sign-in successful"
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
});


//endpoint to see the users purchases 
userRouter.get("/purchases" , function(req,res){
    res.json({
        message : " purchases endpoint"
       })
});

module.exports = {
    userRouter : userRouter
}