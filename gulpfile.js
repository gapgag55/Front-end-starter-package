var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer')
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    jade = require('gulp-jade'),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('jades', function() {
  return gulp.src('src/jade/*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./'))
});

// Compile Sass to css and place it in css/styles.css
gulp.task('styles', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      'sourcemap=none': true
    }))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest('css/'))
});

// Watch for changes in scss files
// Watch for errors in js file
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['jshint', 'compress']);
    gulp.watch('src/jade/**/*.jade', ['jades']);
});

// Catch JS errors
gulp.task('jshint', function() {
    // return gulp.src('src/js/*.js')
    //     .pipe(jshint())
    //     .pipe(jshint.reporter('jshint-stylish'))
    return true;
});

// Ugligy JS
gulp.task('compress', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

// Minify CSS
gulp.task('minify-css', function() {
  return gulp.src('css/styles.css')
  	.pipe(rename({suffix: ".min"}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'));
});

// All tasks together
gulp.task('default', ['jades', 'styles','compress', 'jshint', 'watch', 'browser-sync']);