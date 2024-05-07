const asyncHandler=require("express-async-handler")
const User= require("../model/userModel")

const register=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Required fields are missing")
    }

    const user= await User.findOne({email})
    if(user){
        res.status(400)
        throw new Error("User exists")
    }
    const newuser=await User.create({
        name,
        email,
        password
    })
// JO 
    if(newuser){
        console.log("reg successful")
        res.status(201).json(
            {
                _id:newuser._id,
                name:newuser.name,
                email:newuser.email,
                pic:newuser.pic
            }
        )

    }
    else{
        res.status(400)
        throw new Error("Failed to create new user")
    }

})


const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user= await User.findOne({email})
    if(!user){
        console.log("user doesnt exist")
        res.status(401)
        throw new Error("user doesnt exist")
    }
    if(user && user.password ===password){
        console.log("login successful")
        console.log(user.password,password)
        res.json(
            {
                
                _id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic
            }
        )
    }
    else{
        console.log("wrong credentials")
        res.status(401)
        throw new Error("wrong credentialz")
    }
})
// /api/user?
const allUsers = asyncHandler(async(req,res)=>{
    const key=req.query.search ? {
        $or:[
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    }:{}
    //jo future non plag suggestion: use filter here??
    console.log("backend hitting")
    const users = await User.find(key).find({ _id: { $ne: req.user._id } });
    console.log(users)
    res.send(users);
})

module.exports={register, loginUser,allUsers}