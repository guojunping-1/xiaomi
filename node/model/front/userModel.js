const db = require("../../tools/db");
module.exports = {
    async doRegits({count,userName,pwd,phone,emial}){
    let sql = `insert into merchants (count,pwd,userName,phone,emial) values("${count}","${pwd}","${userName}","${phone}","${emial}")`;
        return await db.q(sql);
    },
    async findUserName({userName}){
        let sql = `select * from merchants where username = "${userName}"`;
        return db.q(sql);
    },
    async doCountLogin({count,pwd}){
        let sql = `select * from merchants where count = "${count}" and pwd = "${pwd}"`;
        return await db.q(sql);
    },
    async doPhoneLogin({phone,pwd}){
        let sql = `select * from merchants where phone = "${phone}" and pwd = "${pwd}"`;
        return db.q(sql);
    },
    async useIdFindUserName({id}){
        let sql = `select * from merchants where id = "${id}"`;
        return await db.q(sql);
    },
    async useIdFindCount({id}){
        let sql = `select * from merchants where id = "${id}"`;
        return await db.q(sql);
    },
    async getUserData({id}){
        let sql = `select * from merchants where id = "${id}"`;
        return await db.q(sql);
    },
    async doEdit({id,value,type}){
        let sql = `update merchants set ${type} = "${value}" where id = "${id}"`;
        return await db.q(sql);
    },
    async addImg({id,newFileName}){
        let sql = `update merchants set header = "${newFileName}" where id = "${id}"`;
        return db.q(sql);
    },
    async findUserMoney({id}){
        let sql = `select * from merchants where id = "${id}"`;
        return db.q(sql);
    },
    async topUp({money,id}){
        let sql = `update merchants set balance = "${money}" where id = "${id}"`;
        return db.q(sql);
    }
}