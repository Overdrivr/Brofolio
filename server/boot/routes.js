module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', function(req, res) {
    res.render('index.jade');
  })
    .get('/admin', function(req, res) {
    res.render('admin.jade');
  });
  app.use(router);
}
