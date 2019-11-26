const productModel = require("../../model/back/productModel");
const fs = require("fs");
const path = require("path");
const db = require("../../tools/db"); 
module.exports = {
    async getProductList(req, res) {
        let {pageNo,singlePageNum} = req.query;
        // console.log("1:"+pageNo)
        // console.log("2:"+singlePageNum)
        let goods = await productModel.getList({pageNo,singlePageNum});
        res.send(goods);
    },
    async editProductList(req, res) {
        let files = req.files;
        let {
            id,
            title,
            des,
            goodId,
            price,
            inventory,
            preferential,
            carousel,
            type
        } = req.body;

        await productModel.editList({
            goodId,
            title,
            des
        });
        await productModel.editImg({
            id,
            goodId,
            files
        });
        await productModel.editVersion({
            id,
            goodId,
            price,
            inventory,
            preferential,
            carousel,
            type
        });
        res.send();
    },
    // 新增商品
    async addProductList(req, res) {
        let files = req.files;
        let {
            title,
            des,
            price,
            inventory,
            preferential,
            categoryName
        } = req.body;
        let result = await productModel.addList({
            title,
            des
        });
        let insertId = result.insertId;
        await productModel.addGood({
            price,
            inventory,
            preferential,
            insertId
        });
        // 添加分类
            let sql = `update goodversion set category = "${categoryName}" where   goodId = "${insertId}"`;
            await db.q(sql);
        // 给goodversion添加categoryId
            let sql2 = `select * from category where categoryName = "${categoryName}"`
            let ask = await db.q(sql2);
            ask = ask[0].id;
            let sql3 = `update goodversion set categoryId = "${ask}" where goodId = "${insertId}"`;
            await db.q(sql3);
            // 给good添加categoryId
            let sql4 = `update good set categoryId = "${ask}" where id = "${insertId}"`;
            await db.q(sql4);
        for (let index in files) {
            let file = files[index];
            // 获取文件后缀
            let ext = path.extname(file.originalname);
            let newPathName = file.path + ext;
            // 要将已经保存到了uploads文件夹下的文件进行改名字
            fs.rename(file.path, newPathName, (error, data) => {});
            // 当名字修改好后，再来将这个图片的存放路径保存到数据库中
            let newFileName = file.filename + ext;
            newFileName = 'http://localhost:10086/' + newFileName;
            await productModel.addImg({
                insertId,
                newFileName
            });
        }
        res.send();
    },
    // 添加版本
    async addVersion(req, res) {
        let files = req.files;
        let {
            goodId,
            title,
            des,
            price,
            inventory,
            preferential,
            carousel,
            type,
            categoryName
        } = req.body;   
        if(carousel == undefined || carousel == ""){
            carousel = -1;
        }
        let result = await productModel.addVersion({
            goodId,
            price,
            inventory,
            preferential,
            carousel,
            type,
            categoryName
        });
        let insertId = result.insertId;
        for (let index in files) {
            let file = files[index];
            // 获取文件后缀
            let ext = path.extname(file.originalname);
            let newPathName = file.path + ext;
            // 要将已经保存到了uploads文件夹下的文件进行改名字
            fs.rename(file.path, newPathName, (error, data) => {});
            // 当名字修改好后，再来将这个图片的存放路径保存到数据库中
            let newFileName = file.filename + ext;
            newFileName = 'http://localhost:10086/' + newFileName;
            await productModel.addVersionImg({
                insertId,
                newFileName
            });
        }
        res.send();
    },
    // 得到产品个数
    async getCount(req,res){
        let count = await productModel.getCount();
        res.send(count);
    },
    // 删除产品
    async deleteProduct(req,res){
        let {goodId,id} = req.query;
        await productModel.deleteProduct({goodId,id});
        res.send();
    }
}