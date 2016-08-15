var package  = require('../../package.json');
var gulp  = require('gulp');
var file  = require('gulp-file');
var cheerio = require('gulp-cheerio');
var download = require('gulp-download');
var rename = require("gulp-rename");

const DEFAULT_PAGE = 'http://www.nzz.ch/schweiz/schafrisse-uri-gibt-wolf-zum-abschuss-frei-ld.105907?reduced=true';


gulp.task('download-page',function(){
  var page = process.env.PAGE || DEFAULT_PAGE;
  return download(page)
    .pipe(rename("downloaded-dummypage.html"))
    .pipe(gulp.dest('build'));
});


gulp.task('generate-dummypage', ['download-page'], function(){
  var insertIndex = process.env.INSERT_AT || 0;
  return gulp
    .src(['./build/downloaded-dummypage.html'])
    .pipe(rename("index.html"))
    .pipe(cheerio(function ($, file) {

      // change page title
      $('title').text('Dummy Page for '+package.name);

      $('body').html(
        $('body').html() +
        `
          <script src="jspm_packages/system.js"></script>
          <script src="config.js"></script>
          <script>System.import('dev-view');</script>
        `
      )

    }))
    .pipe(gulp.dest(''));
});
