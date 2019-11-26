const db = require("../../tools/db");
const fs = require("fs");       
const path = require("path");
module.exports = {
    async getList({pageNo,singlePageNum}) {
        let sql = `select g.* ,v.* from 
            good g INNER JOIN goodversion v ON (g.id = v.goodId) limit ${pageNo}, ${singlePageNum} `;
        return await db.q(sql);
    },
    async editList({
        goodId,
        title,
        des
    }) {
        let sql = `update good set title = "${title}" ,des = '${des}' where id = "${goodId}"`;
        return await db.q(sql)
    },
    async editVersion({
        id,
        goodId,
        price,
        inventory,
        preferential,
        carousel,
        type
    }) {
        let sql2 = `update goodversion set price = "${price}",inventory = "${inventory}" , preferential = "${preferential}", carousel = "${carousel}",type ="${type}"  where id = "${id}" and goodId = "${goodId}"`;
        return await db.q(sql2)
    },
    async editImg({
        id,
        goodId,
        files
    }) {
        for (let index in files) {
            let file = files[index];
            // 获取文件后缀
            let ext = path.extname(file.originalname);
            let newPathName = file.path + ext;
            // 要将已经保存到了uploads文件夹下的文件进行改名字
            fs.rename(file.path, newPathName, (error, data) => {});
            // 当名字修改好后，再来将这个图片的存放路径保存到数据库中
            let newFileName = file.filename + ext;
            newFileName = 'http://localhost:10086/' + newFileName
            let sql3 = `update goodversion set imgSrc = "${newFileName}" where goodId = "${goodId}" and id = "${id}"`;
            return await db.q(sql3);
        }
    },
    // 添加商品
    async addList({
        title,
        des
    }) {
        let sql = `insert into good (title,des) values("${title}","${des}")`;
        return await db.q(sql)
    },
    async addGood({
        insertId,
        price,
        inventory,
        preferential
    }) {
        let sql = `insert into goodversion (price,inventory,preferential,goodId) values("${price}","${inventory}","${preferential}","${insertId}")`;
        return await db.q(sql)
    },
    async addImg({
        insertId,
        newFileName
    }) {
        let sql = `update goodversion set imgSrc = "${newFileName}" where goodId = "${insertId}"`;
        return db.q(sql);
    },
    // 添加版本
    async addVersion({goodId,
        price,
        inventory,
        preferential,
        carousel,
        type,
        categoryName
    }) {
        let sql2 = `select * from category where categoryName = "${categoryName}"`;
        let result = await db.q(sql2);
        let categoryId = result[0].id;
        let sql = `insert into goodversion (price,inventory,preferential,goodId,carousel,type,category,categoryId)
        values ("${price}","${inventory}","${preferential}","${goodId}","${carousel}","${type}","${categoryName}","${categoryId}") `;
        return db.q(sql);
    },
    async addVersionImg({insertId,newFileName}){
        let sql = `update goodversion set imgSrc = "${newFileName}" where id = "${insertId}"`;
        return await db.q(sql);
    },
    // 获取个数
    async getCount(req,res){
        let sql = `select count(id) as count from goodversion`;
		return await db.q(sql);
    },
    // 删除产品
    async deleteProduct({goodId,id}){ 
        let sql = `delete from goodversion where id = "${id}" and goodId = "${goodId}"`;
        return db.q(sql);
    }
}