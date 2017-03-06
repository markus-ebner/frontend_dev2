'use strict';

const fs = require('fs');
const serveStatic = require('serve-static');
const gulp = require('gulp');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const browserify = require('browserify');
const babelify = require('babelify');
const hbsfy = require("hbsfy");
const uglifyify = require("uglifyify");
const source = require('vinyl-source-stream');
const open = require('gulp-open');


gulp.task('clean', function () {
  return gulp.src('/dist', {read: false})
    .pipe(clean());
});

gulp.task('reload', function() {
  return browserify('./src/app.js')
    .transform(babelify)
    .transform(hbsfy)
    .transform(uglifyify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});


gulp.task('connect', function () {
  connect.server({
    root: './dist',
    hostname: '0.0.0.0',
    livereload: true,
    port: 3000,
    middleware: (connect, options) => {
      const middlewares = []

      if (!Array.isArray(options.root)) {
        options.root = [options.root]
      }

      options.root.forEach(function(base) {
        middlewares.push(serveStatic(base))
      })

      // default: index.html
      middlewares.push((req, res) => {
        fs
          .createReadStream(`${options.root}/index.html`)
          .pipe(res)
      })
      return middlewares
    }
  });
});

gulp.task('watch', function () {
  return gulp.watch(['./src/**/*.js','./src/**/*.hbs'], ['reload']);
});

gulp.task('copy', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task('open', function(){
  gulp.src('./dist/index.html')
    .pipe(open({uri: 'http://localhost:3000', app: 'Google Chrome'}));
});


gulp.task('default', ['clean','copy','watch']);
gulp.task('start', ['default','connect', 'open', 'watch']);
