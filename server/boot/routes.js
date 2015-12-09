module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/', function(req, res) {
    res.render('index.jade');
  })
    .get('/admin/projects', function(req, res) {
    res.render('admin/projects.jade');
  })
    .get('/admin/projects/new', function(req, res) {
    res.render('admin/project-new.jade');
  });
  app.use(router);
}
