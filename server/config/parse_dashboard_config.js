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