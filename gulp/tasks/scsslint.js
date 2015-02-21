var gulp            = require('gulp');
var handleErrors    = require('../handleErrors');
var config          = require('../config').sass;
var usenotifier     = require('../config').usenotifier;
var gutil           = require('gulp-util');
var scsslint        = require('gulp-scss-lint');
var cache           = require('gulp-cached');
var path            = require('path');
var gulpif          = require('gulp-if');
var notify          = require('gulp-notify');

// Custom linting reporter
var errorReporter = function(file, stream) {
    if (!file.scsslint.success) {
        file.scsslint.issues.forEach(function(err) {
            if (err) {
                notify().write(
                    err.severity + ' in ' + path.basename(file.path) + ':' +
                        err.line + ' @ char ' + err.column + '\n' + err.reason
                );
            }
        });
    }
};

gulp.task('scsslint', function() {
    gulp.src(config.src)
    .pipe(cache('scsslint'))
    .pipe(gulpif(usenotifier,
        scsslint({config: './.scsslint.yml', customReport: errorReporter}),
        scsslint({config: './.scsslint.yml'})
    ))
    .on('error', handleErrors);
});
