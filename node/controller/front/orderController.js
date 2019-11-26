const orderModel = require("../../model/front/orderModel");
module.exports = {
    async createOrder(req,res){ 
        let {address,good,user,money} = req.body;
        address = address.replace(/<\/?.+?>/g,""); 
        address = address.replace(/[\r\n]/g, ""); 
        good = good.replace(/<\/?.+?>/g,""); 
        good = good.replace(/[\r\n]/g, ""); 
        await orderModel.writeOrder({address,good,user})
        let result = await orderModel.getUserMoney({user});
        let balance = result[0].balance;
        balance = balance - money;
        await orderModel.decreaseUserMoney({balance,user});
        res.send();
    },
    async getOrder(req,res){
        let {id} = req.body;
        let result = await orderModel.getOrder({id});
        for(let i=0;i<result.length;i++){
            // 利用切割字符串中表示换行的/n和空格的/g
            result[i].address = result[i].address.replace(/[\r\n]/g,"");
            result[i].good = result[i].good.replace(/[\r\n]/g,"");
            // 字符串转数组
            result[i].address = JSON.parse(result[i].address);
            result[i].good = JSON.parse(result[i].good); 
        }
        res.send(result);
    },
    async getCount(req,res){
        let count = await orderModel.getCount();
        res.send(count);
    },
    async page(req,res){
        let {pageNo,singlePageNum} = req.query;
        let result = await orderModel.getList({pageNo,singlePageNum});
        for(let i=0;i<result.length;i++){
            // 利用切割字符串中表示换行的/n和空格的/g
            result[i].address = result[i].address.replace(/[\r\n]/g,"");
            result[i].good = result[i].good.replace(/[\r\n]/g,"");
            // 字符串转数组
            result[i].address = JSON.parse(result[i].address);
            result[i].good = JSON.parse(result[i].good); 
        }
        res.send(result);
    },
}