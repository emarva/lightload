var gulp = require('gulp'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp.src('src/lightload.js')
        .pipe(uglify({compress: true}))
        .pipe(concat('lightload.min.js'))
        .pipe(concat.header('/* Minified on <%= new Date() %> */\n'))
        .pipe(gulp.dest('dist'));
});
