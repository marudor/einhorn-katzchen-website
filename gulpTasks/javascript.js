var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
  .pipe(plugins.babel())
  .pipe(gulp.dest('dist/'));
});
