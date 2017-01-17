var path = require('path');

module.exports = function(app) {
  var router = app.loopback.Router();
  var options = {
    root: path.join(__dirname,'/../../', app.get('views')),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  router.get('/', function(req, res) {
    res.sendFile('index.html',options);
  });

  app.use(router);
};
