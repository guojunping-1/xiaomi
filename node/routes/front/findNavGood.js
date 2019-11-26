const express = require("express");
const findNavGood = express.Router();
const findNavGoodController = require("../../controller/front/findNavGoodController");
findNavGood.get("/",findNavGoodController.findGoods);

module.exports = findNavGood;