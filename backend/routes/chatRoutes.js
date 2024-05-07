const express= require("express");
const {accessChat,fetchChats, createGroup,renameGroup,addToGroup,removeFromGroup} =require("../controllers/chatController");
const {protect}= require("../middleware/auth");

const router =express.Router()

router.route("/").post(protect,accessChat)// creating chat = access
router.route("/").get(protect,fetchChats)
router.route("/creategroup").post(protect, createGroup);
router.route("/rename").put(protect, renameGroup);
router.route("/remove").put(protect, removeFromGroup);
router.route("/add").put(protect, addToGroup);
// router.route("/deletechat").delete(deleteChats)


module.exports=router