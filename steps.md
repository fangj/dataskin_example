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

## 安装 antd 5

`yarn add antd`

## 调整服务端 router

### 创建server/router.js
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

## 客户端路由

### 安装 react-router
`yarn add react-router-dom`

### 创建 client/src/router.jsx
```
import React from "react";
import { createHashRouter } from "react-router-dom";
import App from './App';
const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <div>Login</div>,
    },
    {
        path: "/*",
        element: <div>Other</div>,
    },
]);

export default router;
```

### 修改main.jsx

删除
```
import App from './App.jsx'
...
<App />
```

添加
```
import {RouterProvider} from "react-router-dom";
import router from "./router";
...
<RouterProvider router={router} />
```