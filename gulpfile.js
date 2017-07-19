var gulp = require('gulp');

gulp.task('copy', function () {
    return gulp
        .src('./src/slot-event.js')
        .pipe(gulp.dest('./example'));
});