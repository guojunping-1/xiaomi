const userModel = require("../../model/front/userModel");
const fs = require("fs");
const path = require("path");
module.exports = {
    async regits(req,res){
        let {userName,pwd,phone,emial} = req.body;
        let count = Math.floor(Math.random()*10000000000+1);
        await userModel.doRegits({count,userName,pwd,phone,emial});
        let msg = {
            state:"1",
            info:"注册成功",
            count:count
        };
         res.send(msg);
    },
    async gotUserName(req,res){
        let {userName} = req.body;
        let msg = {};
        let result = await userModel.findUserName({userName});
        if(result.length == 0){
            msg={
                state:"1",
                info:"注册成功"
            }
        }else if(result.length != 0){
            msg={
                state:"-1",
                info:"用户名已存在"
            }
        }
        res.send(msg);
    },
    async login(req,res){
        let {count,phone,pwd} = req.body;
        let msg = {};
        if(count == undefined || count == ""){
            let result = await userModel.doPhoneLogin({phone,pwd});
            if(result.length == 0){
                msg = {state:"-1",info:"请输入正确的手机号和密码"};
            }else{
                msg = {state:"1",info:"欢迎回来",id:result[0].id};
            }
        }else if(phone == undefined || phone == ""){
            let result = await userModel.doCountLogin({count,pwd});
            let id = await userModel.useCountFindId({count,pwd});
            if(result.length == 0){
                 msg = {state:"-1",info:"请输入正确的账号和密码"};
            }else{
                 msg = {state:"1",info:"欢迎回来",id:result[0].id};
            }
        }
        res.send(msg);
    },
    async findUserName(req,res){
        let {id} = req.body;
        let result = await userModel.useIdFindUserName({id});
        result = result[0].username
        res.send(result);
    },
    async getCount(req,res){
        let {id} = req.body;
        let result = await userModel.useIdFindCount({id});
        result = result[0].count;
        res.send(result);
    },
    async getUserData(req,res){
        let {id} = req.body;
        let result = await userModel.getUserData({id});
        res.send(result);
    },
    async doEdit(req,res){
        let {type,id,value} = req.body;
        await userModel.doEdit({type,id,value});
        res.send();
    },
    async editImg(req,res){
        let files = req.files;
        let {id} = req.body;
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
            await userModel.addImg({
                id,
                newFileName
            });
        }
        res.send();
    },
    async topUp(req,res){
        let {money,id} = req.body;
        let result = await userModel.findUserMoney({id});
        let balance = result[0].balance;
        if(balance == null || balance == "" ||balance == undefined){
            balance = 0;
        }
        money = parseInt(money) + parseInt(balance);
        await userModel.topUp({money,id});
        res.send();
    }
};