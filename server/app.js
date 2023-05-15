var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//===parse server begin===

const ParseServer = require('parse-server').ParseServer;
const parseServer = new ParseServer(require('./config/parse_server_config.js'));

// Start server
parseServer.start();

// Serve the Parse API on the /parse URL prefix
app.use('/parse', parseServer.app);

//===parse server end===

//=== parse client begin ===
const Parse = require('parse/node');
const {appId, masterKey ,serverURL} = require('./config/parse_server_config.js');
Parse.initialize(appId,null,masterKey);
Parse.serverURL = serverURL;
//=== parse client begin ===

//=== parse dashboard begin ===

const ParseDashboard = require('parse-dashboard');
const dashboard = new ParseDashboard(require('./config/parse_dashboard_config.js'),{ allowInsecureHTTP: true });
app.use('/dashboard', dashboard);

//=== parse dashboard end ===


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


//路由分派要放到最后
require("./router")(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
