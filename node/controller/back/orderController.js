const orderModel = require("../../model/back/orderModel");

module.exports = {
    async getOrder(req,res){
         let result = await orderModel.getData();
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
    async changeState(req,res){
        let {goodId,versionId,orderId} = req.body;
        let result = await orderModel.getData();
        let good = [];
        for(let i=0;i<result.length;i++){
            if(result[i].id == orderId){
            // 利用切割字符串中表示换行的/n和空格的/g
            result[i].good = result[i].good.replace(/[\r\n]/g,"");
            // 字符串转数组
            result[i].good = JSON.parse(result[i].good);
            good.push(result[i].good);
            }
        }
       for(let i=0;i<good.length;i++){
           for(let j=0;j<good[i].length;j++){
               if(good[i][j].obj.id == goodId && good[i][j].obj.version.id == versionId){
                       good[i][j].obj.state = "卖家已发货";
               }
           }
       }
       good = JSON.stringify(good);
       var reg = /^\[/gi;
        var reg2 = /\]$/gi;
        good = good.replace(reg, '');
        good = good.replace(reg2, '');
       await orderModel.delivery({orderId,good})
       res.send();
    }
}