var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var cssmodulesify = require('css-modulesify');
var reactify = require('reactify');

gulp.task('default', ['css-and-scripts', 'html']);

gulp.task('css-and-scripts', function () {
  var b = browserify('src/index.js', { transform: [reactify] });

  cssmodulesify(b, { o: 'dist/main.css' })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});
