var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var pug = require('gulp-pug');
// var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

gulp.task('mini-JS', function () {

    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(gulp.dest('js/dist'))

})

// Sass compile into Css
gulp.task('scss', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('./css'))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./css/dist/'))
});

gulp.task('pugToHtml', function () {
    return gulp.src('./pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./html/'));
})

// watch if you change :> 
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
    });

    // run first time you call this task 
    gulp.parallel("scss", "pugToHtml", "mini-JS")()
    // watch when change 
    gulp.watch('./scss/**/*.scss', gulp.series('scss'));
    gulp.watch("./js/*.js", gulp.series('mini-JS'));
    gulp.watch("./pug/**/*.pug", gulp.series('pugToHtml'));
    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("html/**/*.html").on("change", browserSync.reload);
    gulp.watch("scss/**/*.scss").on("change", browserSync.reload);
    gulp.watch("js/*.js").on("change", browserSync.reload);

})