var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var cssmodulesify = require('css-modulesify');
var reactify = require('reactify');
var simpleVars = require('postcss-simple-vars');
var doiuse = require('doiuse');

var cssVariables = require('./src/components/example/vars.js');

gulp.task('default', ['css-and-scripts', 'html']);

gulp.task('css-and-scripts', function () {
  var postCSSPlugins = [
		'postcss-modules-local-by-default',
		'postcss-modules-extract-imports',
		'postcss-modules-scope',
		simpleVars({
			variables: cssVariables
		}),
    doiuse({
			browsers:['ie >= 9', '> 1%', 'last 2 versions'],
			onFeatureUsage: function(usageInfo) {
				logStatsPretty(usageInfo.message);
			}
		})
  ];

  return browserify('src/index.js', { transform: [reactify] })
      .plugin('css-modulesify', {
        o: 'dist/main.css',
        use: postCSSPlugins
      })
      .bundle()
      .pipe(source('index.js'))
      .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});
