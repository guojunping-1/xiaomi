const detialModel = require("../../model/front/detialModel");
module.exports = {
    async getDetial(req,res){
        let {id} = req.body;
        let good = await detialModel.getGood({id});
        for(let i=0;i<good.length;i++){
            let goodId = good[i].id;
            let goodversion = await detialModel.getVersion({goodId});
            good[i].version = goodversion; 
        }
        res.send(good);
    }
}