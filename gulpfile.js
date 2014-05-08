var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('clean', function () {
  return gulp.src('public/*', {read: false})
    .pipe(clean());
});

gulp.task('css', ['clean'], function () {
  gulp.src('./assets/stylesheets/application.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(filesize())
    .pipe(minifyCSS({
      keepSpecialComments:0,
      processImport: true
    }))
    .pipe(rename('application.min.css'))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(filesize())
    .on('error', gutil.log);
});

gulp.task('js', ['clean'], function() {
  return gulp.src([
    'vendor/bower/react/react.js',
    'vendor/bower/jquery/dist/jquery.js',
    'vendor/bower/jquery-ui/ui/jquery.ui.core.js',
    'vendor/bower/jquery-ui/ui/jquery.ui.effect.js',
    'assets/javascripts/vendor/*.js',
    'assets/javascripts/*.js'
    ])
    .pipe(react())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('application.min.js'))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(filesize())
    .on('error', gutil.log)
});

gulp.task('test', function () {
  return gulp.src([
    'controllers/**/*.js',
    'middlewares/**/*.js',
    'models/**/*.js',
    'app.js'
    ])
    .pipe(istanbul())
    .on('end', function () {
      return gulp.src(['test/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports());
    });
});

gulp.task('assets', ['clean', 'js', 'css']);
gulp.task('default', ['test']);
