//Include Gulp
var gulp = require('gulp');

//Include Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
//Concatenate & Minify JS files
gulp.task('scripts', function () {
    'use strict';
    return gulp
        .src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});
//Css Compiler
gulp.task('sass', function () {
    'use strict';
    return gulp
        .src('src/scss/style.scss')
        .pipe(rename({suffix: '.min'}))
        //.pipe(sass({style: 'compressed'}))
        .pipe(gulp.dest('build/css'));
});
//Image Optimization
gulp.task('images', function () {
    'use strict';
    return gulp
        .src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('build/img'));
});

//Default Task
gulp.task('default', ['scripts', 'sass', 'images']);
