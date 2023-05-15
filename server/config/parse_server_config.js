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
