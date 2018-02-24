'use strict';
var changed     = require('gulp-changed');
var filter      = require('gulp-filter');
var glob        = require('glob');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var newer       = require('gulp-newer');
var notify      = require('gulp-notify');
var rename      = require('gulp-rename');
var responsive  = require('gulp-responsive');
var size        = require('gulp-size');
var util        = require('gulp-util');

// include paths file
var paths       = require('../paths');

// 'gulp images:optimize' -- optimize images
gulp.task('images:optimize', () => {
  return gulp.src([paths.imageFilesGlob, '!src/assets/images/{feature,feature/**,lazyload,lazyload/**}']) // do not process feature images
    .pipe(newer(paths.imageFilesSite))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng(),
      imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ], {verbose: true}))
    .pipe(gulp.dest(paths.imageFilesSite))
    .pipe(size({title: 'images'}));
});

// 'gulp images:responsive' -- resize and optimize responsive images
gulp.task('images:responsive', () => {
  return gulp.src([paths.imageFiles + paths.imagePattern])
    .pipe(changed(paths.imageFilesSite))
    .pipe(responsive({
      // resize all images
      '*': [{
        // image-320w.jpg is 320 pixels wide
        width: 320,
        rename: {
          suffix: '-320',
          extname: '.jpg',
        },
      },
      {
        // image-480w.jpg is 480 pixels wide
        width: 480,
        rename: {
          suffix: '-480',
          extname: '.jpg',
        },
      },
      {
        // image-576w.jpg is 576 pixels wide
        width: 576,
        rename: {
          suffix: '-576',
          extname: '.jpg',
        },
      },
      {
        // image-640w.jpg is 640 pixels wide
        width: 640,
        rename: {
          suffix: '-640',
          extname: '.jpg',
        },
      },
      {
        // image-720w.jpg is 720 pixels wide
        width: 720,
        rename: {
          suffix: '-720',
          extname: '.jpg',
        },
      },
      {
        // image-768w.jpg is 768 pixels wide
        width: 768,
        rename: {
          suffix: '-768',
          extname: '.jpg',
        },
      },
      {
        // image-800w.jpg is 800 pixels wide
        width: 800,
        rename: {
          suffix: '-800',
          extname: '.jpg',
        },
      },
      {
        // image-960w.jpg is 960 pixels wide
        width: 960,
        rename: {
          suffix: '-960',
          extname: '.jpg',
        },
      },
      {
        // image-1024w.jpg is 1024 pixels wide
        width: 1024,
        rename: {
          suffix: '-1024',
          extname: '.jpg',
        },
      },
      {
        // image-1200w.jpg is 1200 pixels wide
        width: 1200,
        rename: {
          suffix: '-1200',
          extname: '.jpg',
        },
      },
      {
        // image-1280w.jpg is 1280 pixels wide
        width: 1280,
        rename: {
          suffix: '-1280',
          extname: '.jpg',
        },
      },
      {
        // image-1366w.jpg is 1366 pixels wide
        width: 1366,
        rename: {
          suffix: '-1366',
          extname: '.jpg',
        },
      },
      {
        // image-1440w.jpg is 1440 pixels wide
        width: 1440,
        rename: {
          suffix: '-1440',
          extname: '.jpg',
        },
      },
      {
        // image-1536w.jpg is 1536 pixels wide
        width: 1536,
        rename: {
          suffix: '-1536',
          extname: '.jpg',
        },
      },
      {
        // image-1600w.jpg is 1600 pixels wide
        width: 1600,
        rename: {
          suffix: '-1600',
          extname: '.jpg',
        },
      },
      {
        // image-1920w.jpg is 1920 pixels wide
        width: 1920,
        rename: {
          suffix: '-1920',
          extname: '.jpg',
        },
      }],
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 80,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      // Do not emit the error when image is enlarged.
      errorOnEnlargement: false,
    }))
    .pipe(gulp.dest(paths.imageFilesSite));
});

// // 'gulp images:feature' -- resize images
// gulp.task('images:feature', () => {
//   return gulp.src([paths.imageFiles + paths.imagePattern])
//     .pipe(responsive({
//       // resize all images
//       '*': [{
//         width: 320,
//         rename: {
//           suffix: '-320px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 480,
//         rename: {
//           suffix: '-480px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 576,
//         rename: {
//           suffix: '-576px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 640,
//         rename: {
//           suffix: '-640px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 720,
//         rename: {
//           suffix: '-720px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 768,
//         rename: {
//           suffix: '-768px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 800,
//         rename: {
//           suffix: '-800px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 960,
//         rename: {
//           suffix: '-960px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 1024,
//         rename: {
//           suffix: '-1024px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 1200,
//         rename: {
//           suffix: '-1200px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 1280,
//         rename: {
//           suffix: '-1280px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 1366,
//         rename: {
//           suffix: '-1366px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 1440,
//         rename: {
//           suffix: '-1440px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 1536,
//         rename: {
//           suffix: '-1536px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 1600,
//         rename: {
//           suffix: '-1600px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }, {
//         width: 1920,
//         rename: {
//           suffix: '-1920px',
//           extname: '.jpg',
//         },
//         // Do not enlarge the output image if the input image are already less than the required dimensions.
//         withoutEnlargement: true,
//       }],
//     }, {
//       // Global configuration for all images
//       // The output quality for JPEG, WebP and TIFF output formats
//       quality: 80,
//       // Use progressive (interlace) scan for JPEG and PNG output
//       progressive: true,
//       // Strip all metadata
//       withMetadata: false,
//       // Do not emit the error when image is enlarged.
//       errorOnEnlargement: false,
//     }))
//     .pipe(gulp.dest(paths.imageFilesSite));
// });
