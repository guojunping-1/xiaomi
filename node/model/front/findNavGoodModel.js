const db = require("../../tools/db");
module.exports = {
     async getCategory(){
         let sql = `select * from category `;
         return await db.q(sql);
     },
     async getGood({categoryId}){
         let sql = `select * from good where categoryId = "${categoryId}"`
         return await db.q(sql);
     },
     async getGoodVersion(goodId){
         let sql = `select * from goodversion where goodId = "${goodId}"`;
         return await db.q(sql);
     }
}