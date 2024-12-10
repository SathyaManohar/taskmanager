const mongoose=require('mongoose');

const taskschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:["Not Started","In Progress","Completed","Overdue"],
        default:"Not Started",
    },
    duedate:{
        type:Date,
        required:true,
    },
    createddate:{
        type:Date,
        required:true,
        default: Date.now,
    },
    createdby:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
    },


   

},{timestamps:true}
);



const taskmodelobj=mongoose.model("task",taskschema);

module.exports={
    taskmodelobj,
}