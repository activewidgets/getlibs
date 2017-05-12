
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	version = require('./package.json').version;

var files = [
	'node_modules/es6-promise/dist/es6-promise.auto.js',
	'node_modules/systemjs/dist/system.src.js',
	'config.js',
	'cfg/*.js',
	'x-modules.js'
];


var cfg = {
	sourceMappingURLPrefix: 'https://unpkg.com/getlibs@' + version
};


gulp.task('source', function() {

	return gulp.src(files, {base: './'})
		.pipe(sourcemaps.init())
		.pipe(concat('src.js'))
		.pipe(sourcemaps.write('', cfg))
		.pipe(gulp.dest(''));
});


gulp.task('minified', function() {

	return gulp.src(files, {base: './'})
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('system.js'))
		.pipe(sourcemaps.write('', cfg))
		.pipe(gulp.dest(''));
});


gulp.task('default', ['source', 'minified']);

