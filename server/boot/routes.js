module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', function(req, res) {
    res.render('index.jade');
  });
  app.use(router);
}
