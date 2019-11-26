const {
  fileDir,
  uploadDir,
  keys,
  renderDir
} = require("./config");
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const artTemplate = require("express-art-template");
//  插件的设置
app.set("views", renderDir);
app.engine("html", artTemplate);
app.set("view engine", "html");
app.use(multer({
  dest: uploadDir
}).any());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieSession({
  count: "session",
  keys: keys,
  maxAge: 24 * 60 * 60 * 1000
}));
// 读取静态文件
app.use(express.static(fileDir));
app.use(express.static(uploadDir));
// 关于跨域的配置
app.use("*",(req,res,next)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	next();
})

// 路由的设置
var apiRouter = require('./routes/front/api');
var usersRouter = require('./routes/back/index');
app.use('/api', apiRouter);
app.use('/api/back', usersRouter);


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));



// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;