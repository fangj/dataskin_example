var express = require('express');
const router = require("express-promise-router")()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
