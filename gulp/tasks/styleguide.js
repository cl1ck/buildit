var gulp         = require('gulp'),
    styleguide   = require('sc5-styleguide'),
    config       = require('../config').styleguide,
    sassconfig   = require('../config').sass,
    sass         = require('gulp-sass');

gulp.task('styleguide:generate', function() {
  return gulp.src(sassconfig.watch)
    .pipe(styleguide.generate({
        title: config.title,
        server: false,
        rootPath: config.dest,
        overviewPath: './README.md',
        appRoot: '/docs'
      }))
    .pipe(gulp.dest(config.dest));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(sassconfig.src)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(config.dest));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
