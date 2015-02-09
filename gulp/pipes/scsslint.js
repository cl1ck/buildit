var lazypipe        = require('lazypipe'),
    handleErrors    = require('../handleErrors'),
    config          = require('../config').sass,
    gutil           = require('gulp-util'),
    plumber         = require('gulp-plumber'),
    scsslint        = require('gulp-scss-lint'),
    cache           = require('gulp-cached'),
    path            = require('path'),
    map             = require('map-stream'),
    events          = require('events'),
    emmitter        = new events.EventEmitter(),
    errorReporter;

// Custom linting reporter
errorReporter = map(function(file, cb) {
    if (!file.scsslint.success) {
        file.scsslint.issues.forEach(function(err) {
            if (err) {
                // Error message
                var msg = [
                    path.basename(file.path),
                    'Line: ' + err.line,
                    'Column: ' + err.column,
                    'Severity: ' + err.severity,
                    'Reason: ' + err.reason
                ];

                // Emit this error event
                emmitter.emit('error', new Error(msg.join('\n')));
            }
        });
    }
    cb(null, file);
});

module.exports = lazypipe()
                .pipe(plumber)
                .pipe(cache, 'scsslint')
                .pipe(scsslint, {
                    config: './.scsslint.yml'
                })
                .pipe(function() {
                    return errorReporter
                });
