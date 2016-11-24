var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webpack  = require('webpack');
var webpack_stream = require('webpack-stream');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig    = require('./webpack.config.js');
var browserSync = require('browser-sync').create();

var jsFiles = 'app/index.js',
    jsDest = 'app/dist/scripts';

    gulp.task('scripts', function() {
        return gulp.src(jsFiles)
            .pipe(webpack_stream())
            .pipe(rename('scripts.min.js'))
			.pipe(ngAnnotate({
            // true helps add where @ngInject is not used. It infers.
            // Doesn't work with resolve, so we must be explicit there
            add: true
        }))
            .pipe(uglify())
            .pipe(gulp.dest(jsDest))
          /*  .pipe(concat('scripts.js'))
            .pipe(rename('scripts.min.js'))
            .pipe(uglify())

            .pipe(gulp.dest(jsDest));*/
    });
    gulp.task('default', ['scripts', 'webpack-server'])
    gulp.task('webpack-server', function (c) {
      var myConfig = Object.create(webpackConfig);
      console.log(myConfig);
    myConfig.devtool = 'eval';
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        stats: {
            colors: true
        },
        contentBase: './app'
    }).listen(myConfig.devServer.port, 'localhost', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html');

      //  gutil.log(['myConfig'], myConfig);
    });
  });
