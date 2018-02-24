'use strict';
var argv  = require('yargs').argv;
var gulp  = require('gulp');
var shell = require('shelljs');
var size  = require('gulp-size');

// include paths file
var paths = require('../paths');

// 'gulp site:tags' -- Create the Jekyll tags
gulp.task('site:tags', done => {
  process.stdout.write('Executing site:tags');
  shell.exec('ruby .tmp/src/_gentags.rb --verbose');
  done();
});

// 'gulp site:tmp' -- Copies the Jekyll site to a temporary directory to be processed
gulp.task('site:tmp', () => {
  return gulp.src([paths.sourceFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName], {dot: true})
    .pipe(gulp.dest(paths.tempDir + paths.sourceFolderName))
    .pipe(size({title: 'Jekyll'}));
});

// 'gulp site' -- Builds the website with the development settings
// 'gulp site --prod' -- Builds the website with the production settings
gulp.task('site', done => {
if (!argv.prod) {
    shell.exec('bundle exec jekyll build --config _config.yml --trace');
    done();
  } else if (argv.prod) {
    shell.exec('bundle exec jekyll serve --trace');
    done();
  }
});

// 'gulp site:check' -- builds site with production settings then tests with html-proofer
gulp.task('site:check', done => {
  shell.exec('gulp build --prod');
  done();
});
