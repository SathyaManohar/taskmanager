const mongoose=require('mongoose');
const {createHmac,randomBytes}=require("crypto");
const {createtoken}=require("../services/auth");
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
    },

},{timestamps:true}
);

userschema.pre("save",function(next){
const user=this;
if(!user.isModified("password"))return;

const salt=randomBytes(16).toString();
const hashedpassword=createHmac("sha256",salt).update(user.password).digest("hex");
user.salt=salt;
user.password=hashedpassword;
next();
});

userschema.static("matchdetailsandgettoken",async function(email,password){
const user=await this.findOne({email:email});
if(!user)throw new Error("Error");

const newhash=createHmac("sha256",user.salt).update(password).digest("hex");
if(user.password!==newhash)throw new Error("Error");
const token=createtoken(user);
return token;
});

const modelobj=mongoose.model("user",userschema);

module.exports={
    modelobj,
}