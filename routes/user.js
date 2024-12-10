const express=require("express");
const router=express.Router();
const {modelobj}=require("../models/user");
const {taskmodelobj}=require("../models/task");
router.get('/',async(req,res)=>{
    if(!req.user){
        return res.render("mainpage");
    }

    const tasks=await taskmodelobj.find({createdby:req.user._id}).populate("createdby");
    console.log("Tasks",tasks);
    return res.render("home",{
        user:req.user,
        tasks:tasks,

    });
});
router.get('/signin',(req,res)=>{
    return res.render("signin");
});
router.get('/signup',(req,res)=>{
    return res.render("signup");
});
router.get('/logout',async(req,res)=>{
    res.clearCookie('mycookie').redirect('/mainpage');
    
})

router.post('/signin',async(req,res)=>{
    
  try{
    const {email,password}=req.body;
    const token=await modelobj.matchdetailsandgettoken(email,password);
    return res.cookie("mycookie",token).redirect('/');
  }
 
  catch(error){
    return res.render("signin",{
        error:"Invalid password or Email",
    });
  }

});

router.post('/signup',async(req,res)=>{
    console.log(req.body);
    const user= await modelobj.create({
         password:req.body.password,
         email:req.body.email,
         name:req.body.name,
     });
     return res.redirect('/signin');
});

module.exports={
    router,
}