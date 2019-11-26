const express = require("express");
const getDetial = express.Router();
const detialController = require("../../controller/front/datialController");

getDetial.post("/",detialController.getDetial);

module.exports = getDetial;