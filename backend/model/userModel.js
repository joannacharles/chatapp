const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique: true},
    password:{type:String, required:true},
    profilepicture:{
        type:String,
        default:"https://pbs.twimg.com/media/FV3r0DcWIAEpJ41.jpg"
    }
},
{timestamps:true}
)

const User=mongoose.model("User",userSchema)

module.exports=User

