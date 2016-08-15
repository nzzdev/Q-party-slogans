var gulp = require('gulp');
var env = require('gulp-env');
var fs = require('fs');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

var package = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('setup-env', function(cb) {
  var env = {
    VERSION: package.version === '0.0.0' ? 'dev' : package.version,
  }

  fs.mkdir(paths.output, function() {
    fs.writeFile(paths.output + 'es6/' + 'env.json', JSON.stringify(env), function() {
      fs.writeFile(paths.output + 'amd/' + 'env.json', JSON.stringify(env), function() {
        fs.writeFile(paths.output + 'system/' + 'env.json', JSON.stringify(env), function() {
          fs.writeFile(paths.output + 'commonjs/' + 'env.json', JSON.stringify(env), cb);
        });
      });
    });
  });
});

gulp.task('build-source-copy-es6', function () {
  return gulp.src(paths.source_copy)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-es6', ['build-source-copy-es6'], function () {
  return gulp.src(paths.source)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-source-copy-commonjs', function () {
  return gulp.src(paths.source_copy)
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-commonjs', ['build-source-copy-commonjs'], function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'common'})))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-source-copy-amd', function () {
  return gulp.src(paths.source_copy)
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-amd', ['build-source-copy-amd'], function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'amd'})))
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-source-copy-system', function () {
  return gulp.src(paths.source_copy)
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-system', ['build-source-copy-system'], function () {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'build-styles',
    ['setup-env', 'build-es6', 'build-commonjs', 'build-amd', 'build-system'],
    callback
  );
});