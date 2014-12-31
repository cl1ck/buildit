var dest = './build';
var src = './src';

module.exports = {
    browserSync: {
        server: {
            // We're serving the src folder as well
            // for sass sourcemap linking
            baseDir: [dest, src]
        },
        files: [
            dest + '/**',
            // Exclude Map files
            '!' + dest + '/**.map'
        ]
    },
    sass: {
        src: src + '/sass/*.{sass,scss}',
        dest: dest + '/css/',
        watch: src + '/sass/**/*.{sass,scss}',
        settings: {
            // Required if you want to use SASS syntax
            // See https://github.com/dlmanning/gulp-sass/issues/81
            sourceComments: 'map',
            imagePath: '/images' // Used by the image-url helper
        }
    },
    images: {
        src: src + '/images/**',
        dest: dest + '/images'
    },
    jade: {
        src: src + '/htdocs/**',
        dest: dest
    },
    browserify: {
        // Enable source maps
        debug: true,
        // Additional file extentions to make optional
        extensions: ['.coffee'],
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/javascript/app.coffee',
            dest: dest + '/js/',
            outputName: 'app.js'
        }, {
            entries: src + '/javascript/head.coffee',
            dest: dest + '/js/',
            outputName: 'head.js'
        }]
    }
};