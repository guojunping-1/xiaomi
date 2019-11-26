const express = require("express");
const productRouter = express.Router(); 
const productController = require("../../controller/back/product");

productRouter.get("/",productController.getProductList)
productRouter.post("/edit",productController.editProductList)
productRouter.post("/add",productController.addProductList)
productRouter.post("/addVersion",productController.addVersion)
productRouter.get("/getCount",productController.getCount)
productRouter.get("/delete",productController.deleteProduct)
module.exports = productRouter;