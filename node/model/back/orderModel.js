const db = require("../../tools/db");

module.exports = {
    async getData(){
        let sql = `select m.* , i.* from 
        merchants m INNER JOIN indent i ON (m.id = i.userId) `;
        return await db.q(sql);
    },
    async delivery({orderId,good}){
        let sql = `update indent set good = '${good}' where id = '${orderId}'`;
        return db.q(sql);
    }
}