// Requires
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');

// @vars
var topFile = 'assets/sass/style.scss',
    destination = 'assets/css';

gulp.task('css', function() {
  return sass(topFile, { style: 'compressed'})
    .pipe(autoprefixer({ browsers: ['last 1 version'] }))
    .pipe(gulp.dest(destination))
    .pipe(notify({ message: 'CSS task done'}));
});

gulp.task('watch', function() {
  // watch sass file changes and trigger css task
  gulp.watch(topFile, ['css']);
});

gulp.task('default', ['watch']);

