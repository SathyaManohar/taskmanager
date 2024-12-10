const jwt=require("jsonwebtoken");

const secretkey="@mano12$";
function createtoken(user){
    const token=jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
    },secretkey);
    console.log("token",token);
return token;
}

function validatetoken(token){
    const payload=jwt.verify(token,secretkey);
    console.log("Payload",payload);
    return payload;
}

module.exports={
    createtoken,validatetoken,
}