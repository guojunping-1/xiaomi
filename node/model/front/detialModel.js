const db = require("../../tools/db");
module.exports = {
    async getGood({id}){
        let sql = `select * from good where id = "${id}"`;
        return await db.q(sql);
    },
    async getVersion({goodId}){
        let sql = `select * from goodversion where goodId = "${goodId}"`;
        return await db.q(sql); 
    }
}