var gulp = require('gulp');
var serve = require('gulp-serve');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
livereload = require('gulp-livereload');


gulp.task('default', function(done) {
    runSequence(['build', 'assets', 'sass'], 'serve', 'watch');
});


gulp.task('dist', function(done) {
    runSequence(['build', 'assets', 'sass']);
});

gulp.task('serve', serve('dist'));

gulp.task('build', function () {
    var templateData = {},
    options = {
        ignorePartials: true, //ignores unknown partials
        batch : ['./src/partials'],
    }

    return gulp.src('src/**/*.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  livereload.listen({ start: true });
  gulp.watch('src/**/*', ['build', 'sass']);
});

gulp.task('assets', function () {

    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});


gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
})
