const db = require("../../tools/db");

module.exports = {
    async writeOrder({address,good,user}){
       let sql = `insert into indent (address,good,userId) values ('${address}','${good}','${user}')`;
       return await db.q(sql);
    },
    async getOrder({id}){
        let sql = `select * from indent where userId = "${id}"`;
        return await db.q(sql);
    },
    async decreaseUserMoney({balance,user}){
        let sql = `update merchants set balance = "${balance}" where id = "${user}"`;
        return await db.q(sql)
    },
    async getUserMoney({user}){
        let sql = `select * from merchants where id = "${user}"`;
        return await db.q(sql);
    },
    async getCount(){
        let sql = `select count(id) as count from indent`;
		return await db.q(sql);
    },
    async getList({pageNo,singlePageNum}){
        let sql = `select * from indent order by id desc limit ${pageNo}, ${singlePageNum} `;
    return await db.q(sql);
    }
}