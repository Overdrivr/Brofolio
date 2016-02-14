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
      expect(element.all(by.css('md-list')).count()).toEqual(0);
  });

  it('then should create a project called dummy',
  function() {
      browser.findElement(by.css('button')).click();
      browser.findElement(by.model('title')).sendKeys('dummy');
      browser.findElement(by.buttonText('Accept')).click();
  });
});
