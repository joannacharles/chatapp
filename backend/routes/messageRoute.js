const express=require('express')
const {
   allMessages,
   sendMsg,
  } = require("../controllers/messageController");
  const { protect } = require("../middleware/auth");
const router=express.Router()

router.route('/:chatId').get(protect,allMessages)
router.route('/').post(protect,sendMsg)

module.exports=router