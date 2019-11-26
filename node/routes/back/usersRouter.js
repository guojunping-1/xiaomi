var express = require('express');
var userRouter = express.Router();
let db = require("../../tools/db");
let backController = require("../../controller/back/index")
userRouter.get("/" , (req,res)=>{
  res.send("后端接口");
})
.post('/doLogin', backController.doLogin)

module.exports = userRouter;