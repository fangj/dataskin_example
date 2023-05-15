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
    app_name:"test_app",
    http_server_port:"3000",
    mongo_server:"mongodb://127.0.0.1:27017",
    db_name:"test_db",
    parse_appId: 'parse_appId',
    parse_masterKey: 'parse_masterKey', 
}
```
### 新建配置文件 server/config/parse_server_config.js

```
const { http_server_port, mongo_server, db_name, parse_appId, parse_masterKey } = require('./config');

module.exports = {
    databaseURI: `${mongo_server}/${db_name}`,// Connection string for your MongoDB database
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
const {parse_appId,parse_masterKey,app_name}=require("./config");
module.exports={
  "apps": [{
    appName:app_name,
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

## 添加swagger doc

### 安装 swagger
`yarn add swagger-jsdoc swagger-ui-express`

### 修改 server/app.js
```
//===swagger begin===
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//用swaggerJsdoc从代码读取接口
const {app_name}=require('./config/config'); 
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: app_name,
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'].map(p=>path.join(__dirname,p)), // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//===swagger end===
```

### 在router/index.js 中写一个测试doc
```
//=== session test begin ===
/**
 * @openapi
 * /test:
 *   get:
 *     summary: test api docs
 *     responses:
 *       200:
 *         description: show "test" string
 */
router.get('/test', async function(req, res) {
  res.send("test");
});
```

### 测试
http://localhost:3000/api-docs/


## 添加session支持

### 安装
`yarn add express-session connect-mongodb-session`

### 在server/app.js 中添加

```
//=== session begin ===
//在dashboard前使用session导致dashboard无法正常显示。
//使用session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {mongo_server}=require('./config/config');
const store = new MongoDBStore({
  uri: `${mongo_server}/connect_mongodb_session_store`, //使用mongo存放session数据
  collection: 'mySessions'
});
// Catch errors
store.on('error', function(error) {
  console.log(error);
});
app.use(session({
  store: store,
  secret: 'secret_code',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false , //如果设为true,则必须使用https访问
    maxAge:1000*60*60*8    //过期时间
  },
  rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}));
//=== session end ===
```

### 写一个测试session的服务

```
//=== session test begin ===
router.get('/view', async function(req, res) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});
//=== session test end ===
```


## 增加文件上传下载服务

### 安装
`yarn add multer cors parse`

### 在config.js中添加用于上传文件的目录
```
const path=require("path");
...
 uploads_dir:path.join(__dirname,"..","..","uploads"), //存放上传文件的目录
```

### 添加 helpers/parse.js
```
function p2p(p) {
    return new Promise((resolve, reject) => {
        return p.then(resolve, reject);
    });
}
exports.p2p = p2p;
function toJSON(doc) {
    if (doc) {
        return doc.toJSON();
    }
    else {
        return null;
    }
}
exports.toJSON = toJSON;
function toJSONList(docs) {
    return docs.map(toJSON);
}
exports.toJSONList = toJSONList;
```

### 添加 lib/lib_hash.js
```
'use strict';

function checksumFile(algorithm, path) {
    return new Promise(function (resolve, reject) {
        let fs = require('fs');
        let crypto = require('crypto');

        let hash = crypto.createHash(algorithm).setEncoding('hex');
        fs.createReadStream(path)
            .once('error', reject)
            .pipe(hash)
            .once('finish', function () {
                resolve(hash.read());
            });
    });
}
// checksumFile('sha1', process.argv[2]).then(function (hash) {
//     console.log('hash:', hash);
// });

module.exports={
    checksumFile
};
```

### 添加用于上传下载的路由文件 router/file.js
```
//上传下载文件
/**
 * @openapi
 * tags:
 * - name: file
 *   description: 上传下载文件
 */
const router = require("express-promise-router")(); //允许路由返回promise,方便使用async/await
const cors = require('cors');

var path=require('path');
var multer  = require('multer');

const {checksumFile}=require("../lib/lib_hash");
const fs=require('fs');

const config=require("../config/config");
const uploads_dir=config.uploads_dir;
const upload = multer({ dest: uploads_dir });
//console.log('uploads_dir',uploads_dir);

const FileService=require("../services/file");
const ParseHelper = require('../helpers/parse');

/*
{ fieldname: 'file',
  originalname: 'Human-Figure-Proportions-Chart-800.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'D:\\test\\server\\uploads',
  filename: 'dbf16144c0f71873135ac5a90eefc22c',
  path:
   '\\server\\uploads\\dbf16144c0f71873135ac5a90eefc22c',
  size: 259970 }
*/
/**
 * @openapi
 * /file/upload:
 *   post:
 *     tags:
 *     - file
 *     summary: 文件上传
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               # The property name 'file' will be used for all files.
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 返回JSON文件信息
 */
//上传文件，在file字段中
router.post('/upload', upload.single('file'), async function (req, res) {
    let {mimetype,filename,size}=req.file;
    //console.log('req.file',req.file);
    //用文件内容生成hash文件名，并改名
    let newFileName;
    try{
        const hashName=await checksumFile('sha1',req.file.path);
        const newFilePath=path.join(req.file.destination,hashName);
        //如果相同hash的文件名存在，检查已有文件是否损坏，如果损坏，删除损坏的文件
        if(fs.existsSync(newFilePath)){
            const checksum=await checksumFile('sha1',newFilePath);
            if(checksum!==hashName){ //如果文件损坏
                fs.unlinkSync(newFilePath);//删除原有的相同sha文件
            }
        }
        //再次检查文件是否存在，如果不存在就用新文件改名。否则删除新上传的文件
        if(!fs.existsSync(newFilePath)){
            fs.renameSync(req.file.path,newFilePath);//改名
        }else{
            fs.unlinkSync(req.file.path);//删除新上传的文件
        }
        newFileName=hashName; //替换成功后或已有的同内容文件可用，新文件名为hash
    }catch (e) {
        //生成hash不成功，或者改名操作不成功=>维持原文件名
        newFileName=filename;
    }
    // 解决中文名乱码的问题
    let originalname=filename;
    if(req.file.originalname){
        originalname= Buffer.from(req.file.originalname, "latin1")
            .toString("utf8")
    }
    var result = await FileService.saveFileInfo({originalname,mimetype,filename:newFileName,size});
    result = ParseHelper.toJSON(result);
    const url_prefix="/file/";
    result.url=url_prefix + result.objectId;
    result.type=result.mimetype;
    res.json(result);
});

/**
 * @openapi
 * /file/{fileId}:
 *   get:
 *     tags:
 *     - file
 *     summary: 文件下载
 *     parameters:
 *       - name: fileId
 *         in: path
 *         required: true
 *         description: 要下载的文件ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 返回下载的文件
 */
//GET /upload/Y9SL4cHZUQ3gdnGZ
//下载文件
router.get('/:id',cors(),  async function (req, res) {
    const fileInfo=await FileService.findFileInfo(req.params.id);
    if(!fileInfo){
        res.sendStatus(404);
    }
    const fileLocation = path.join(uploads_dir,fileInfo.filename);
    res.download(fileLocation,fileInfo.originalname);
});

module.exports = router;
```

### 在 server/app.js 中添加 parse client 的初始化代码
```
//=== parse client begin ===
const Parse = require('parse/node');
const {appId, masterKey ,serverURL} = require('./config/parse_server_config.js');
Parse.initialize(appId,null,masterKey);
Parse.serverURL = serverURL;
//=== parse client begin ===
```

### 添加往数据库记录查询文件信息的服务

```
const Parse = require('parse/node');
const ParseHelper = require("../helpers/parse");
const FileObj = Parse.Object.extend("v1_file");

function  findFileInfo(fileId){
    const query = new Parse.Query(FileObj);
    query.equalTo('objectId', fileId);
    query.notEqualTo("isDeleted", true);
    return query.first({ useMasterKey: true }).then(ParseHelper.toJSON);
}

function  saveFileInfo(data){
    const parseFile = new FileObj(data);
    return parseFile.save(null,{ useMasterKey: true });
}
module.exports={
    findFileInfo,
    saveFileInfo,
};
```
### 把路由挂载到router.js中
```
app.use('/file', require('./routes/file'));
```