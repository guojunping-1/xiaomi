const db = require("../../tools/db");

module.exports = {
    async getList(){
        let sql = `select * from category `;
        return await db.q(sql);
    },
    async delete({id}){
        let sql = `delete from category where id = "${id}"`
        return await db.q(sql);
    },
    async edit({id,categoryName}){

        let sql = `update category set categoryName = "${categoryName}" where id = "${id}"`;
        return await db.q(sql);
    },
    async add({categoryName}){
        let sql = `insert into category (categoryName) values("${categoryName}")`;
        return db.q(sql);
    }
}