//Include Gulp
var gulp = require('gulp');

//Include Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//static server + watching scss/html files
gulp.task('serve', ['sass'], function () {
    'use strict';
    browserSync({
        server: {
            baseDir: "./"
        },
        files: "./src/scss/*.scss"
    });
    gulp.watch("*.scss", ['sass']);
    gulp.watch("*.html").on('change', reload);
    
});



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
        .src('src/scss/*.scss')
        .pipe(rename({suffix: '.min'}))
        .pipe(sass())
        //.pipe(sass({style: 'compressed'}))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream: true}));
});
//Image Optimization
gulp.task('images', function () {
    'use strict';
    return gulp
        .src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('build/img'));
});

//Watch files for Changes
gulp.task('watch', function () {
    'use strict';
    gulp.watch('src/scss/*.scss', ['sass']);
    
    /*Trigger a live reload on any changes*/
    
});

//Default Task
gulp.task('default', ['scripts', 'sass', 'watch', 'images', 'serve']);
