describe('Brofolio', function() {
  it('should initally display no items from the API', function() {
      browser.get('#');
      var c = element.all(by.css('img')).count();
      expect(c).toEqual(0);
  });

  it('should go to login page and be redirected after providing valid creds',
  function() {
      browser.get('#/login');
      browser.findElement(by.id('user')).sendKeys('a@foo.com');
      browser.findElement(by.id('password')).sendKeys('foobar');
      browser.findElement(by.css('button')).click();
      expect(browser.getCurrentUrl()).toMatch("projects");
  });

  it('should initally see no project',
  function() {
      e = element(by.id('projectList')).all(by.css("md-list-item"))
      expect(e.count()).toEqual(0);
  });

  it('should create a project called dummy',
  function() {
      browser.findElement(by.css('button')).click();
      browser.findElement(by.model('title')).sendKeys('dummy');
      browser.findElement(by.buttonText('Accept')).click();
  });

  it('should see the freshly created project inside project list.',
  function() {
      e = element(by.id('projectList')).all(by.css("md-list-item"))
      expect(e.count()).toEqual(1);
  });

  it('should go to the newly created project admin page',
  function() {
    browser.findElement(by.css('a[href*="#/edit/1"]')).click()
  });

  var path = require('path');

  it('should upload an asset to the project',
  function() {
    var fileToUpload = './avatar.png'
    var absolutePath = path.resolve(__dirname, fileToUpload);
    console.log(absolutePath)
    $('#uploadButton').click();
    $('input[type="file"]').sendKeys(absolutePath);
    $('#saveButton').click();
  });

  it('should go back to the main page and see the newly created asset',
  function() {
    browser.get('#');
    var c = element.all(by.css('img')).count();
    expect(c).toEqual(1);

    var e = browser.findElement(by.css('img'))
    expect(e.getAttribute('ng-src')).toEqual('avatar.png')
  });
});
