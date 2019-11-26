const db = require("../../tools/db");

module.exports = {
    async getMerchantsList(){
        let sql = `select * from merchants`;
        return await db.q(sql);
    },
    async getPageCount({pageNo,singlePageNum}){
        let sql = `select * from merchants limit ${pageNo}, ${singlePageNum}`;
        return await db.q(sql);
    },
    async getCount(){
		let sql = `select count(id) as count from merchants`;
		return await db.q(sql);
    }
}