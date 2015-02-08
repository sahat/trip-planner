var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
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
      baseDir: './public/'
    }
  });
});

gulp.task('sass', function() {
  gulp.src('./client/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css/'))
    .pipe(reload({ stream: true }));
});

gulp.task('browserify', function() {
  var bundler = watchify(browserify('./client/main.js', watchify.args));
  bundler.transform(function(file) {
    return reactify(file, { es6: true });
  });
  bundler.on('update', rebundle);
  function rebundle() {
    return plumber()
      .pipe(bundler.bundle())
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js/'))
      .pipe(reload({ stream: true }));
  }
  return rebundle();
});

gulp.task('minify', function() {
  var css = gulp.src('./public/css/main.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css/'));

  var js = gulp.src('./public/js/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));

  return merge(css, js);
});

gulp.task('watch', function() {
  gulp.watch('./client/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['browser-sync', 'sass', 'browserify', 'watch']);