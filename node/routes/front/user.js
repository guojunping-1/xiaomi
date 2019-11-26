const express = require("express");
const userRouter = express.Router();
const userController = require("../../controller/front/userController");

userRouter.post("/regits",userController.regits);
userRouter.post("/getUsrName",userController.gotUserName);
userRouter.post("/login",userController.login);
userRouter.post("/findUserName",userController.findUserName);
userRouter.post("/findCount",userController.getCount);
userRouter.post("/userData",userController.getUserData);
userRouter.post("/edit",userController.doEdit);
userRouter.post("/editImg",userController.editImg);
userRouter.post("/topUp",userController.topUp);
module.exports = userRouter;