const carouselModel = require("../../model/front/carouselModel");
module.exports = {
    async getCarousel(req,res){
        let good = await carouselModel.getGood();
        for(let i = 0;i < good.length;i ++){
            let id = good[i].id;
            let version = await carouselModel.getVersion({id});
            good[i].version = version;
        }
        res.send(good);
    },
    async getCategory(req,res){
        let result = await carouselModel.getCategory();
        res.send(result);
    }
}