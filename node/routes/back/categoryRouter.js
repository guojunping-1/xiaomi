const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../../controller/back/category");
categoryRouter.get("/",categoryController.getCategoryList);
categoryRouter.get("/delete",categoryController.deleteItem);
categoryRouter.get("/edit",categoryController.editItem);
categoryRouter.get("/add",categoryController.addItem);
module.exports = categoryRouter;