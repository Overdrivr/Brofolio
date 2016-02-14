# Bro-folio
Portfolio for my Bro. Also, a project for learning to use Angular JS + Angular
Material on the front-end.

Backend is based on [LoopBack](http://loopback.io).

## Tests
### Client
Requirements : mocha, [Protractor](http://www.protractortest.org/#/)

Open webdriver-manager test server
```
webdriver-manager start
```
Start loopback server (this repo)
```
node .
```
Run Protractor test suite
```
protractor conf.js
```

### Server
Requirements : mocha
```
mocha test
```
