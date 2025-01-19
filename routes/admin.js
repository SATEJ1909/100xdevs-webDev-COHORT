require('dotenv').config()
const bcrypt = require("bcrypt");
const { z } = require('zod');
const { Router } = require('express');
const adminRouter = Router();
const { userModel } = require("../db")
const {adminModel} = require("../db");
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require("../middleware/admin")
const { JWT_ADMIN_PASSWORD} = require('../config');


adminRouter.post("/signup" ,async function(req,res){
    
   //  const requiredbody = z.object({
   //         email: z.string().email(),
   //         password: z.string(),
   //         FirstName: z.string(),
   //         LastName: z.string(),
   //     });
   
   //     const parsewithsucces = requiredbody.safeParse(req.body);
   
   //     if (!parsewithsucces.success) {
   //         return res.status(400).json({
   //             message: "Invalid input",
   //             errors: parsewithsucces.error.issues
   //         });
   //     }
   
       try {
           const { email, password, FirstName, LastName } = req.body;
   
           const hashedpassword = await bcrypt.hash(password, 10);
   
           await adminModel.create({
               email,
               password: hashedpassword,
               FirstName,
               LastName
           });
   
           res.status(201).json({
               message: "Admin signed up successfully"
           });
       } catch (e) {
           console.error(e); // Debugging
           res.status(500).json({
               message: "Error during sign-up",
               error: e.message
           });
       }
 })

 adminRouter.post("/signin", async function (req, res) {
   try {
       const { email, password } = req.body;

       // Find user by email
       const admin = await userModel.findOne({ email });

       // Check if user exists
       if (!admin) {
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
               JWT_ADMIN_PASSWORD, 
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
 
 
 adminRouter.post("/course" ,adminMiddleware,function(req,res){
      const adminId = req.userId;
   
      const {title , description ,price , imageUrl } = req.body;
      
      const course = {
         title,
         description,
         price,
         imageUrl,
         creatorId : adminId
      }

      res.json({
         message : "course created successfully",
         courseId : course._id 
      })

 });

 adminRouter.put("/course" , adminMiddleware, async function(req,res){
      const adminId = req.id ;

      const course = await userModel.updateOne({
         _id : courseId,
         creatorId : adminId
      },{
         title,
         description,
         price,
         imageUrl
      }
   )

   res.json({
      message : "course updated",
      courseId : course._id
   })
 });

 adminRouter.get("/course/bulk" , function(req,res){
      const adminId = req.id ;
      
      const courses = userModel.find({
         creatorId : adminId
      }) 

      res.json({
         message : "here the cources",
         courses
      })
 });


 module.exports = {
    adminRouter : adminRouter
 }