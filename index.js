const express=require("express");
const app=express();
const port=8005;
const {router}=require("./routes/user");
const ejs=require("ejs");
const path=require("path");
const {mongoose } = require("mongoose");
const {checkforauthentication}=require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const taskrouter=require("./routes/task");
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager").then(()=>console.log("Mongodb connected")).catch((error)=>console.log("Cannot connect Mongodb"));

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use(cookieParser());
app.use(checkforauthentication("mycookie"));
app.use('/user',router);


app.use('/',router);
app.use('/task',taskrouter);

app.get('/mainpage',(req,res)=>{
    return res.render("mainpage");
})

app.listen(port,()=>console.log(`Server started at ${port}`));
