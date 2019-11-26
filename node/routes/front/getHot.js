const express = require("express");
const hot = express.Router();
const hotController = require("../../controller/front/hotController");
hot.get("/",hotController.getHotList);

module.exports = hot;