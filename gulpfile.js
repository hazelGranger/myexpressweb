var gulp = require('gulp'),
    less = require('gulp-less'),
    //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    app = require('express')(),
    swig = require('swig'),
  	express = require('express'),
  	path = require('path'),
    swigGulp = require('gulp-swig');

 
gulp.task('less', function () {
    gulp.src('src/less/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('public/styles'));
});

gulp.task('swigServe',function(){
	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');
	app.set('view cache', false);
    app.use("/public",express.static(path.join(__dirname, 'public')));

    app.get('/*', function (req, res) {
      res.render(req.params[0], { /* template locals context */ });
      // console.log(res,req);
    });
    // app.use('/views',serveIndex('/views',{view:'details'}))

    app.listen(1337);
    console.log('Application Started on http://localhost:1337/');
});

gulp.task('templates',function(){
    gulp.src('views/*.html')
    .pipe(swigGulp())
    .pipe(gulp.dest('public/views'));
});

gulp.task('testWatch', function () {
    gulp.watch('src/**/*.less', ['less']);
});