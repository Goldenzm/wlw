const express = require("express");
const app = express();

//cros跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// 连接数据库
var mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log(err);
  });

// 设置数据库规则
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//创建集合
var user = mongoose.model("userInfo", userSchema);

// 注册
app.get("/resgister", (req, res) => {
  user.create(req.query).then((data) => {
    data ? res.end("注册成功") : res.end("注册失败");
  });
});

// 登录
app.get("/login", (req, res) => {
  user
    .find({ username: req.query.username, password: req.query.password })
    .then((data) => {
      data.length == 0 ? res.end("登录失败") : res.end("登录成功");
    });
});

// 设置监听
app.listen("6060", () => {
  console.log("6060 is running");
});
