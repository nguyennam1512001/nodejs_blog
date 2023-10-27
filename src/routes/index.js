var newRouter = require('./news');
var siteRouter = require('./site');
var courseRouter = require('./courses');
var meRouter = require('./me');

function route(app) {
    app.use('/news', newRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
