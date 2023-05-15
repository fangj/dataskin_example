const path=require("path");

module.exports={
    app_name:"test_app",
    http_server_port:"3000",
    mongo_server:"mongodb://127.0.0.1:27017",
    db_name:"test_db",
    parse_appId: 'parse_appId',
    parse_masterKey: 'parse_masterKey', 
    uploads_dir:path.join(__dirname,"..","..","uploads"), //存放上传文件的目录
}
