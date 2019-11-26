let db = require("../../tools/db")
module.exports = {
    async postDoLogin({count,pwd}){
        let sql = `select * from user where count = "${count}" and
        pwd = "${pwd}"`;
        return await db.q(sql);
    }
}