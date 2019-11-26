const db = require("../../tools/db");

module.exports = {
    async getHotList(){
        let sql = `select * from goodversion where hot = "1"`;
        return await db.q(sql); 
    },
    async getHotGood({id}){
        let sql = `select * from good where id = "${id}"`;
        return await db.q(sql);
    }
}