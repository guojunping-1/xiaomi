const categoryModel = require("../../model/back/categoryModel");
module.exports = {
    async getCategoryList(req,res){
        let result = await categoryModel.getList();
        res.send(result);
    },
    async deleteItem(req,res){
        let {id} = req.query;
        let result = await categoryModel.delete({id});
        res.send(result);
    },
    async editItem(req,res){
        let {id,categoryName} = req.query;
        let result = await categoryModel.edit({id,categoryName});
        res.send(result);
    },
    async addItem(req,res){
        let {categoryName} = req.query;
        let result = await categoryModel.add({categoryName});
        res.send(result)
    }
}