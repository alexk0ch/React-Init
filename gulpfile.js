var browserify = require('browserify');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

gulp.task('compile', function(){
  var b = browserify();
  b.transform(reactify); 
  b.add('./src/js/app.js');
  return b.bundle()
    .on('error', function(err){
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js/'));
});
 
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./public"
        },
        reloadOnRestart: false
    });
});

gulp.task('sass', function () {
  gulp.src('./src/scss/app.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["./src/scss/**/*.scss"], ["sass"]);
    gulp.watch(["./src/js/**/*.js", "./src/js/**/*.jsx"], ['compile']);
});