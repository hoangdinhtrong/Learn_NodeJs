const newsRouter = require('./news.route');
const sitesRouter = require('./site.route');
const courseRouter = require('./course.route');
const meRouter = require('./me.route');

function route(app) {
  app.use('/news', newsRouter);
  app.use('/courses', courseRouter);
  app.use('/me', meRouter);
  app.use('/', sitesRouter);

  // app.post('/search', (req, res) => {
  //     console.log(req.body);
  //     res.send('');
  // })
}

module.exports = route;
