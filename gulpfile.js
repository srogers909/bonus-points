{
    'use strict';

    // gulp
    const gulp = require('gulp');

    // plugins
    const connect = require('gulp-connect');
    const jshint = require('gulp-jshint');
    const uglify = require('gulp-uglify');
    const minifyCSS = require('gulp-minify-css');
    const clean = require('gulp-clean');
    const browserify = require('gulp-browserify');
    const concat = require('gulp-concat');
    const runSequence = require('run-sequence');
    const karma = require('karma').Server;

    // tasks
    gulp.task('lint', () => {
        gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('clean', () => {
        gulp.src('./dist/*').pipe(clean({ force: true }));
        gulp.src('./app/js/bundled.js').pipe(clean({ force: true }));
    });

    gulp.task('minify-css', () => {
        const opts = { comments : true, spare : true };
        gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
            .pipe(minifyCSS(opts))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('minify-js', () => {
        gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
            .pipe(uglify({
                // inSourceMap:
                // outSourceMap: "app.js.map"
            }))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('copy-bower-components', () => {
        gulp.src('./app/bower_components/**')
            .pipe(gulp.dest('dist/bower_components'));
    });

    gulp.task('copy-html-files', () => {
        gulp.src('./app/**/*.html')
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('connect', () => {
        connect.server({
            root: 'app/',
            port: 8888
        });
    });

    gulp.task('connectDist', () => {
        connect.server({
            root: 'dist/',
            port: 9000
        });
    });

    gulp.task('browserify', () => {
        gulp.src(['app/js/main.js'])
            .pipe(browserify({
                insertGlobals: true,
                debug: true
            }))
            .pipe(concat('bundled.js'))
            .pipe(gulp.dest('./app/js'));
    });

    gulp.task('browserifyDist', () => {
        gulp.src(['app/js/main.js'])
            .pipe(browserify({
                insertGlobals: true,
                debug: true
            }))
            .pipe(concat('bundled.js'))
            .pipe(gulp.dest('./dist/js'));
    });

    gulp.task('test', (done) => {
        new karma({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, done).start();
    });



    // *** default task *** //
    gulp.task('default', () => {
        runSequence(['clean'], ['lint', 'browserify', 'connect']);
    });

    // *** build task *** //
    gulp.task('build', () => {
        runSequence(
            ['clean'],
            [
                'lint',
                'minify-css',
                'browserifyDist',
                'copy-html-files',
                'copy-bower-components',
                'connectDist'
            ]
        );
    });
}