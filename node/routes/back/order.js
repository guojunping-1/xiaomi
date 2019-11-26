const express = require("express");
const orderRouter = express.Router();
const orderController = require("../../controller/back/orderController");
orderRouter.get("/",orderController.getOrder);
orderRouter.post("/changeState",orderController.changeState);

module.exports = orderRouter;