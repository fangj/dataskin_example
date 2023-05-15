## 基本环境

* 创建客户端基本项目
```
pnpm create vite client --template react
```

* 创建服务端基本项目
```
npx express-generator server --view=ejs 
```

## 运行

* 客户端
`npm run dev`

* 服务端
`SET DEBUG=server:* & npm start`

## 引入antd 5

`yarn add antd@^5`

## 调整服务端 router

### 创建router.js
```
module.exports = function(app)  {
    app.use('/', require('./routes/index'));
    app.use('/users', require('./routes/users'));
}
```

### 修改app.js
* 删除以下语句
```
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);
```

* 改为
```
require("./router")(app);
```

### 服务端异步路由
使用express-promise-router支持返回promise的路由

* 安装

`yarn add express-promise-router`

* 修改
`var router = express.Router();`
改为 
`const router = require("express-promise-router")();`

