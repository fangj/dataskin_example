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