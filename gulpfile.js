const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const csso = require('gulp-csso');

// Default Task
gulp.task('default', ['sass']);


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});