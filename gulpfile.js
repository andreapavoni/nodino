var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');

// var path = require('path');

// var changed = require('gulp-changed');
// var watch = require('gulp-watch');

gulp.task('clean', function () {
  return gulp.src('public/', {read: false})
    .pipe(clean());
});

gulp.task('css', function () {
  gulp.src('./assets/stylesheets/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/stylesheets'))
    .on('error', gutil.log);
});

gulp.task('js', function() {
  return gulp.src(['assets/javascripts/vendor/*.js', 'assets/javascripts/*.js'])
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


gulp.task('default', ['clean', 'js', 'css']);
