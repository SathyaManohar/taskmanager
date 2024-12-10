const {validatetoken}=require("../services/auth");

function checkforauthentication(cookiename){
    return (req,res,next)=>{
        console.log("cokkiename",cookiename);
        const tokenvalue=req.cookies[cookiename];
        console.log("tokenvalue",tokenvalue);
        if(!tokenvalue){
            return next();
        }
try{
    const payload=validatetoken(tokenvalue);
    console.log("payload",payload);
    req.user=payload;
    console.log(req.user);
   
   

}catch(error){
console.log("MiddlewareError");

}
next();





       

    }
}

module.exports={
    checkforauthentication,
}