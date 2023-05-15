var express = require('express');
const router = require("express-promise-router")()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

module.exports = router;
