const router = require("express-promise-router")();

const UnitService =require("../services/unit");

/**
 * @openapi
 * /api/v1/unit/{key}:
 *   get:
 *     tags:
 *     - unit
 *     summary: 取得显示单元对应key的数据
 *     responses:
 *       200:
 *         description: show value
 */
router.get('/:key', async function(req, res) {
    const key=req.params.key;
    const value=await UnitService.getUnitValue(key);
    if(value){
        res.json(value);
    }else{
        res.status(404).send();
    }
});


/**
 * @openapi
 * /api/v1/unit/{key}:
 *   post:
 *     tags:
 *     - unit
 *     summary: 保存显示单元对应key的数据
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: object
 *       required: true
 *     responses:
 *       200:
 *         description: show value
 */
router.post('/:key', async function(req, res) {
    const key=req.params.key;
    const value=req.body;
    try{
        const obj=await UnitService.saveUnitValue(key,value);
        res.send(obj);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;