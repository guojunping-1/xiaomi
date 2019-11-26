const db = require("../../tools/db");

module.exports = {
    async findGood(){
        let sql = `select * from good `;
        return  await db.q(sql);
    },
    async getGoodVersion(id){
        let sql = `select * from goodversion where goodId = "${id}"`;
        return await db.q(sql);
    }
}