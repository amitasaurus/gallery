const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const paths = {
    js: [
        'src/js/app.js',
        'src/js/controllers/*.js',
        'src/js/services/*.js'
    ]
}

// Default Task
gulp.task('default', ['sass', 'js', 'views', 'images']);

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
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env'],
            plugins: ["angularjs-annotate"]
        }))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('build/js/'));
})

gulp.task('views', function() {
    return gulp.src('src/views/**/*.html')
        .pipe(gulp.dest('build/views'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/views/**/*.html', ['views']);
    gulp.watch('src/images/**/*.*', ['images']);
    gulp.watch(paths.js, ['js']);
});