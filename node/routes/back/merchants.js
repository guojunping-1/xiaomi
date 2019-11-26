const express = require("express");
const merchantsRouter = express.Router();
const merchantsController = require("../../controller/back/merchants");

merchantsRouter.get("/",merchantsController.getMerchants)
merchantsRouter.get("/getPage",merchantsController.getTotalPage)
merchantsRouter.get("/totalCount",merchantsController.totalCount)
module.exports = merchantsRouter;