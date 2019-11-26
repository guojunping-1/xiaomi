let db = require("../../tools/db");
let backModel = require("../../model/back/backModel")
module.exports = {
    async doLogin(req,res) {
        let {
            count,
            pwd
        } = req.body;
        let result = await backModel.postDoLogin({count,pwd});
        let data = {};
        if (result.length == 0) {
            data = {
                state: "-1",
                info: "登录失败"
            }
        } else {
            data = {
                state: "1",
                info: "登录成功"
            }
        }
        res.send(data);
    }
}