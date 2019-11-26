const merchantsModel = require("../../model/back/merchantsModel");

module.exports = {
    async getMerchants(req,res){
        let result = await merchantsModel.getMerchantsList();
        res.send(result);
    },
    async getTotalPage(req,res){
        let {pageNo,singlePageNum} = req.query;
        let result = await merchantsModel.getPageCount({pageNo,singlePageNum});
        res.send(result);
    },
    async totalCount(req,res){
        let result = await merchantsModel.getCount();
        res.send(result);
    }
} 