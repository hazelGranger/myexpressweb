var app = require('express')(),
  swig = require('swig'),
  express = require('express'),
  path = require('path'),
  less=require('less-middleware'),
  serveStatic = require('serve-static'),
  serveIndex =require('serve-index');

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false }); 
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
app.use("/public",express.static(path.join(__dirname, 'public')));

app.get('/*', function (req, res) {
  res.render(req.params[0], { /* template locals context */ });
  // console.log(res,req);
});

// app.use('/views',serveIndex('/views',{view:'details'}))

app.listen(1337);
console.log('Application Started on http://localhost:1337/');