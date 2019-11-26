const db = require("../../tools/db");

module.exports = {
    async getMiGood() {
        let sql = `select * from good where categoryId = 6`;
        return await db.q(sql);
    },
    async getMiVersion({
        id
    }) {
        let sql = `select * from goodversion where goodId = "${id}"`;
        return await db.q(sql);
    },
    async getRedMiGood() {
        let sql = `select * from good where categoryId = 4`;
        return await db.q(sql);
    },
    async getRedMivVersion({
        id
    }) {
        let sql = `select * from goodversion where goodId = "${id}"`;
        return await db.q(sql);
    },
    async getTvGood() {
        let sql = `select * from good where categoryId = 2`;
        return await db.q(sql);
    },
    async getTvVersion({
        id
    }) {
        let sql = `select * from goodversion where goodId = "${id}"`;
        return await db.q(sql);
    },
    async getNotebook() {
        let sql = `select * from good where categoryId = 5`;
        return await db.q(sql);
    },
    async getNotebookVersion({
        id
    }) {
        let sql = `select * from goodversion where goodId = "${id}"`;
        return await db.q(sql);
    },
    async getSmartGood(){
        let sql = `select * from good where categoryId = 3`;
        return db.q(sql);
    },
    async getHeadsetGood(){
        let sql = `select * from good where categoryId = 40`;
        return db.q(sql);
    },
    async getHeadsetVersion({id}){
        let sql = `select * from goodversion where goodId = "${id}"`;
        return db.q(sql);
    },
    async getPowerGood(){
        let sql = `select * from good where categoryId = 38`;
        return db.q(sql);
    },
    async getPartsGood(){
        let sql = `select * from good where categoryId = 1`;
        return db.q(sql);
    },
    async getOutGood(){
        let sql = `select * from good where categoryId = 37`;
        return db.q(sql);
    },
    async getLifeGood(){
        let sql = `select * from good where categoryId = 41`;
        return db.q(sql);
    },
    async getHealthGood(){
        let sql = `select * from good where categoryId = 39`;
        return db.q(sql);
    }
};