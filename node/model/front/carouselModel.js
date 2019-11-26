const db = require("../../tools/db");

module.exports = {
    async getGood(){
        let sql = `select * from good`;
        return await db.q(sql)
    },
    async getVersion({id}){
        let sql = `select * from goodversion where carousel = "1" and goodId = "${id}"`;
        return await db.q(sql);
    },
    async getCategory(){
        let sql = `select * from category `;
        return db.q(sql);
    }
}