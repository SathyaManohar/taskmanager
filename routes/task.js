const express=require("express");
const router=express.Router();
const {taskmodelobj}=require("../models/task");


router.get('/',(req,res)=>{
    return res.render("task");
});
router.post('/',async(req,res)=>{
    const tasks=await taskmodelobj.find({createdby:req.user._id}).populate("createdby");
    return res.render("home",{
        user:req.user,
        tasks:tasks,
    });
});

// Route to handle completing a task
router.post('/complete', async (req, res) => {

    const { taskId } = req.body;
    try {
        const task = await taskmodelobj.findById(taskId);
        if (task.createdby.toString() !== req.user._id.toString()) {
            return res.status(403).send("You can only complete your own tasks.");
        }
        task.status = 'Completed';  // Mark task as completed
        await task.save();
        const tasks=await taskmodelobj.find({createdby:req.user._id}).populate("createdby");
        return res.render("home",{
            user:req.user,
            tasks:tasks,
        }); // Redirect to the update page
    } catch (error) {
        console.error("Error completing task:", error);
        return res.status(500).send("An error occurred.");
    }
});


router.get('/update-task',async(req,res)=>{
    const tasks=await taskmodelobj.find({createdby:req.user._id}).populate("createdby");
    return res.render("updatetask",{
        user:req.user,
        tasks:tasks,
    });
   
});
router.post('/add-new',async(req,res)=>{
    const task=req.body;
await taskmodelobj.create({
title:task.title,
description:task.description,
duedate:task.duedate,
status:task.status,
createdby:req.user._id,
});
return res.redirect('/');
});

module.exports=router;