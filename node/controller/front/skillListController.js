const skillModel = require("../../model/front/skillListModel");

module.exports = {
    async getList(req,res){
        let goods = await skillModel.findGood();
        for(let i=0;i<goods.length;i++){
            let id = goods[i].id;
            let goodVersion = await skillModel.getGoodVersion(id);
            goods[i].version = goodVersion;
        }
        res.send(goods);
    }
}