const express = require("express");
const skillList = express.Router();
const skillListController = require("../../controller/front/skillListController");

skillList.get("/",skillListController.getList);

module.exports = skillList;