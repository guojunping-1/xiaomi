const express = require('express');
const orderRouter = express.Router();
const orderController = require("../../controller/front/orderController");

orderRouter.post("/create",orderController.createOrder);
orderRouter.post("/",orderController.getOrder);
orderRouter.get("/getCount",orderController.getCount);
orderRouter.get("/page",orderController.page);
module.exports = orderRouter;