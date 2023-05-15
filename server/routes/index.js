var express = require('express');
const router = require("express-promise-router")()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

module.exports = router;
