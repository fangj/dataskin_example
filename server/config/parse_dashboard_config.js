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