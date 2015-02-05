var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var watchify = require('watchify');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
  return scripts(false);
});

gulp.task('watch', function() {
  return scripts(true);
});

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify('./src/main.js', {
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: watch
  });

  if (watch) {
    bundler = watchify(bundler)
  }

  bundler.transform(function(file) {
    return reactify(file, { es6: true });
  });

  rebundle = function() {
    return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/javascripts'))
      .pipe(livereload({ start: true }));

  };

  bundler.on('update', rebundle);
  return rebundle();
}