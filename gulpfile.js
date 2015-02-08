var gulp = require('gulp');
var sass = require('gulp-sass');
var reactify = require('reactify');
var watchify = require('watchify');
var browserify = require('browserify');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      port: 3000,
      baseDir: './public'
    }
  });
});

gulp.task('sass', function() {
  gulp.src('./client/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('browserify', function() {
  var bundler = watchify(browserify('./client/main.js', watchify.args));
  bundler.transform(reactify);
  bundler.on('update', rebundle);
  function rebundle() {
    return plumber()
      .pipe(bundler.bundle())
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js'))
      .pipe(reload({ stream: true }));
  }
  return rebundle();
});

gulp.task('watch', function() {
  gulp.watch('./client/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['browser-sync', 'sass', 'browserify', 'watch']);