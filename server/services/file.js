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