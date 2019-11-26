const findNavGoodModel = require("../../model/front/findNavGoodModel");
module.exports = {
    async findGoods(req,res){
        let navGood = await findNavGoodModel.getCategory();
        for(let i = 0;i < navGood.length;i ++){
            let categoryId = navGood[i].id;
            let good = await findNavGoodModel.getGood({categoryId});
            if(good.length>24){
                good.length = 24
            }  
            for(let j = 0;j < good.length;j ++){
                let goodVersion = await findNavGoodModel.getGoodVersion(good[j].id);
                good[j].goodVersion = goodVersion;
            }
            navGood[i].good = good;
        }
        res.send(navGood);
    }
}