module.exports = function(app)  {
    app.use('/', require('./routes/index'));
    app.use('/users', require('./routes/users'));
    app.use('/file', require('./routes/file'));
    app.use('/api/v1/unit', require('./routes/unit'));
}