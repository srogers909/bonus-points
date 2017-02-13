(function() {
    // gulp
    const gulp = require('gulp');

    // plugins
    const connect = require('gulp-connect'),
        useref = require('gulp-useref'),
        jshint = require('gulp-jshint'),
        uglify = require('gulp-uglify'),
        clean = require('gulp-clean'),
        concat = require('gulp-concat'),
        browserSync = require('browser-sync').create(),
        runSequence = require('run-sequence'),
        pump = require('pump'),
        templateCache = require('gulp-angular-templatecache'),
        sourcemaps = require('gulp-sourcemaps'),
        less = require('gulp-less'),
        karma = require('karma').Server;

    // tasks
    gulp.task('lint', (cb) => {
        pump([
            gulp.src(['./app/**/*.js', '!./app/bower_components/**']),
            jshint(),
            jshint.reporter('default'),
            jshint.reporter('fail')
        ], cb);
    });

    gulp.task('less', (cb) => {
        pump([
            gulp.src('./app/styles/**/*.less'),
            sourcemaps.init(),
            less(),
            sourcemaps.write(),
            gulp.dest('app/styles'),
            browserSync.stream()
        ], cb);
    });

    gulp.task('clean', (cb) => {
        pump([
            gulp.src('./dist/*'),
            clean({ force: true })
        ], cb);
    });

    gulp.task('browser-sync', () => {
        browserSync.init({
            server: {
                baseDir: './app'
            }
        });
    });

    // gulp.task('minify-js', (cb) => {
    //     pump([
    //         gulp.src(['./app/**/*.js', '!./app/bower_components/**']),
    //         uglify({
    //             outSourceMap: "bonus-points.js.map"
    //         }),
    //         gulp.dest('./dist/')
    //     ], cb);
    // });

    gulp.task('minify', (cb) => {
        pump([
            gulp.src('./app/index.html'),
            sourcemaps.init(),
            useref(),
            sourcemaps.write(),
            gulp.dest('dist/')
        ], cb);
    });

    // to be used with merging into one artifact.
    gulp.task('templates', (cb) => {
        pump([
            gulp.src(
                [
                    './app/**/*.html',
                    '!./app/index.html',
                    '!./app/bower_components/jshint/tests/helpers/browser/index.html'
                ]),
            templateCache('templates.js', {
                module: 'bonusPoints'
            }),
            gulp.dest('dist/')
        ], cb);
    });

    gulp.task('connect', () => {
        connect.server({
            root: 'app/',
            port: 8888
        });
    });

    gulp.task('connect:dist', () => {
        connect.server({
            root: 'dist/',
            port: 9000
        });
    });

    gulp.task('test', (done) => {
        new karma({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, done).start();
    });

    // *** default task *** //
    gulp.task('default', () => {
        runSequence(['clean'], ['lint', 'connect']);
    });

    // *** build task *** //
    gulp.task('build', () => {
        runSequence(
            ['clean'],
            [
                'lint'
            ]
        );
    });

    gulp.task('serve', ['lint', 'less', 'browser-sync'], () => {
        gulp.watch([
            'app/**/*.html',
            'app/**/*.css'
        ]).on('change', browserSync.reload);
    });
}());