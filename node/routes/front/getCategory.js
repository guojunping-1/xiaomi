const express = require("express");
const getCategory = express.Router();
const getCategoryController = require("../../controller/front/categoryController");

getCategory.get("/miphone",getCategoryController.miPhone);
getCategory.get("/redMiPhone",getCategoryController.redMiPhone);
getCategory.get("/tv",getCategoryController.tv);
getCategory.get("/notebook",getCategoryController.notebook);
getCategory.get("/smart",getCategoryController.smart);
getCategory.get("/headset",getCategoryController.headset);
getCategory.get("/power",getCategoryController.power);
getCategory.get("/parts",getCategoryController.parts);
getCategory.get("/life",getCategoryController.life);
getCategory.get("/health",getCategoryController.health);
getCategory.get("/out",getCategoryController.out);
module.exports = getCategory;