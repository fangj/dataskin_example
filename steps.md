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

## 客户端按需加载

### 安装loadable
`yarn add @loadable/component`

### 创建要按需加载的组件文件 routers/Login.jsx

```
import React from "react";

export default()=><div>LoginPage</div>
```

### 在router.jsx文件中按需加载

添加
```
import loadable from "@loadable/component";

const Loading=()=><div>加载中...</div>
const Login = loadable(() => import("./routers/Login"), {fallback: <Loading /> })
```

修改
```
    {
        path: "/login",
        element: <Login/>,
    },
```


### 开发时把请求代理到3000端口

在vite.config.js中添加

```
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
```

## 添加parse

### 安装 mongodb

https://www.mongodb.com/try/download/community

### 安装 parse-server

yarn add parse-server

### 新建配置文件 server/config/config.js
```
module.exports={
    http_server_port:"3000",
    mongoServer:"mongodb://127.0.0.1:27017",
    dbName:"test_db",
    parse_appId: 'parse_appId',
    parse_masterKey: 'parse_masterKey', 
    parse_dashboard_appName:"test_app",
}
```
### 新建配置文件 server/config/parse_server_config.js

```
const { http_server_port, mongoServer, dbName, parse_appId, parse_masterKey } = require('./config');

module.exports = {
    databaseURI: `${mongoServer}/${dbName}`,// Connection string for your MongoDB database
    // cloud: './cloud/main.js', // Path to your Cloud Code
    appId: parse_appId,
    masterKey: parse_masterKey, // Keep this key secret!
    // fileKey: 'optionalFileKey',
    serverURL: `http://localhost:${http_server_port}/parse`,  // Don't forget to change to https if needed
    allowClientClassCreation: false,//是否允许客户端创建Class(发布的时候要改成false)
};
```

### 在 server/app.js 中添加

```
//===parse server begin===

const ParseServer = require('parse-server').ParseServer;
const parseServer = new ParseServer(require('./config/parse_server_config.js'));

// Start server
parseServer.start();

// Serve the Parse API on the /parse URL prefix
app.use('/parse', parseServer.app);

//===parse server end===
```

### 测试

http://localhost:3000/parse/health

### 安装 parse-dashboard

`yarn add parse-dashboard`

### 新建 config/parse_dashboard_config.js

```
const {parse_appId,parse_masterKey,parse_dashboard_appName}=require("./config");
module.exports={
  "apps": [{
    appName:parse_dashboard_appName,
    appId:parse_appId,
    masterKey:parse_masterKey,
    serverURL: '/parse'
  }],
  "users": [
    {
      "user":"admin",
      "pass":"3t1b"
    }
  ]
};
```

### 在server/app.js 中添加

```
//=== parse dashboard begin ===

const ParseDashboard = require('parse-dashboard');
const dashboard = new ParseDashboard(require('./config/parse_dashboard_config.js'),{ allowInsecureHTTP: true });
app.use('/dashboard', dashboard);

//=== parse dashboard end ===
```

### 测试 
http://localhost:3000/dashboard/


## 使用config的端口

### 修改 bin/www

```
const config=require('../config/config');
var port = normalizePort(config.http_server_port || '3000');
```