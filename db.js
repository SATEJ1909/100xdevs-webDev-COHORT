const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const userSchema = new Schema({
    email : {type: String , unique:true},
    password : String,
    FirstName : String,
    LastName : String
});

const adminSchema = new Schema({
    
    email : {type: String , unique:true},
    password : String,
    FirstName : String,
    LastName : String
});


const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : Objectid
});


const purchaseSchema = new Schema({
    course_id : Objectid,
    user_id : Objectid
})

const userModel = mongoose.model("user" ,userSchema);
const adminModel = mongoose.model("admin" ,adminSchema);
const courseModel = mongoose.model("course" ,courseSchema);
const purchaseModel = mongoose.model("purchase" ,purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}