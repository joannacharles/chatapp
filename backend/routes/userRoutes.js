const express=require('express')
const {register, loginUser,allUsers} =require("../controllers/userController")
const {protect}= require("../middleware/auth")
const router=express.Router()

router.route('/').get(protect,allUsers)
router.route('/').post(register)

router.post('/login',loginUser)

module.exports=router