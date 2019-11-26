const express = require("express");
const carousel = express.Router();
const carouselController = require("../../controller/front/carouselController");

carousel.get("/",carouselController.getCarousel);
carousel.get("/category",carouselController.getCategory);
module.exports = carousel;