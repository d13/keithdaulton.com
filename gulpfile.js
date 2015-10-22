var gulp = require('gulp');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

//gulp.task('sass', function() {
//    gulp.src('assets/styles/sass/site.scss')
//        .pipe(sass({
//            outputStyle: 'expanded'
//        }))
//        .pipe(autoprefixer({
//            browsers: [ 'last 2 versions' ],
//            cascade: false
//        }))
//        .pipe(gulp.dest('assets/styles/css'));
//});

gulp.task('less', function() {
    gulp.src('assets/styles/less/site.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [ 'last 2 versions' ],
            cascade: false
        }))
        .pipe(gulp.dest('assets/styles/css'));
});

gulp.task('css', function() {
    gulp.src('assets/styles/css/site.css')
        .pipe(sourcemaps.init())
        .pipe(minifyCss({
            compatibility: 'ie8',
            advanced: false,
            keepSpecialComments: '1'
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/styles/css'));
});

gulp.task('js', function() {
    gulp.src('assets/scripts/site.js')
        .pipe(sourcemaps.init())
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/scripts'));
});

gulp.task('default', ['css', 'js']);