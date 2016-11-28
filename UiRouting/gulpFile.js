var gulp = require("gulp");
var concatJS = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('clean', function () {
    return gulp.src('./dist/', {
            read: false
        })
        .pipe(clean());
});

gulp.task('concatCss', function () {
    return gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css",
                   "bower_components/bootstrap/dist/css/bootstrap.theme.min.css"])
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('./dist/Styles'));
});

gulp.task('concatJS', function () {
    return gulp.src(["./app/*/*.js", "./app/app.js"])
        .pipe(concatJS('all.js'))
        .pipe(gulp.dest('./dist/JS'));
});

gulp.task('compress', function (cb) {
    pump([
        gulp.src('./dist/JS/*.js'),
        uglify(),
        gulp.dest('./dist/')
    ],
        cb
    );
});
gulp.task("default", ["clean", "concatCss", "concatJS"]);
