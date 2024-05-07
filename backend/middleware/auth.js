const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let loggedInUserEmail;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        loggedInUserEmail = req.headers.authorization.split(" ")[1];
        
        req.user = await User.findOne({email:loggedInUserEmail}).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("unauthorized");
      }
    }
  
    if (!loggedInUserEmail) {
      res.status(401);
      throw new Error("unauthorized");
    }
  });
  
  module.exports = { protect };