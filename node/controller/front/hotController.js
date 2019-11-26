const hotModel = require("../../model/front/hotModel");
module.exports = {
    async getHotList(req,res){
        let result = await hotModel.getHotList();
        for(let i=0;i<result.length;i++){
            let id = result[i].goodId;
            let good = await hotModel.getHotGood({id});
            result[i].good = good;
        }
        res.send(result); 
    }
}