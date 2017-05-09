
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	version = require('./package.json').version;

var files = [
	'node_modules/es6-promise/dist/es6-promise.auto.js',
	'node_modules/systemjs/dist/system.src.js',
	'config.js',
	'lib/*.js',
	'x-modules.js'
];


var cfg = {
	sourceMappingURLPrefix: '/ax-system@' + version + '/dist'
};


gulp.task('source', function() {

	return gulp.src(files, {base: './'})
		.pipe(sourcemaps.init())
		.pipe(concat('ax-system.js'))
		.pipe(sourcemaps.write('', cfg))
		.pipe(gulp.dest('dist'));
});


gulp.task('minified', function() {

	return gulp.src(files, {base: './'})
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('ax-system.min.js'))
		.pipe(sourcemaps.write('', cfg))
		.pipe(gulp.dest('dist'));
});


gulp.task('default', ['source', 'minified']);

