var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var bundles_dir= 'bundles/';

gulp.task('sass', function() {
    return gulp.src('src/sass/j.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(bundles_dir))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename(function (path) {
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest(bundles_dir));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass','sass:watch']);