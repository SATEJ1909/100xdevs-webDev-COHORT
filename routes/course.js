const { Router } = require('express') ;

const courseRouter = Router();

//endpoint to purchase the course
courseRouter.post("/purchase" , function(req,res){

})

//endpoint to see the all courses
courseRouter.get("/preview" , function(req,res){
  res.json({
    message : "preview endpoint"
  })
});


module.exports = {
    courseRouter : courseRouter
}