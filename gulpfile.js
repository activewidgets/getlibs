
var fs = require('fs'),
	eslint = require('gulp-eslint'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	header = require('gulp-header'),
	footer = require('gulp-footer'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	version = require('./package.json').version;

var files = [];

String(fs.readFileSync('local/min.js', {encoding:'utf8'})).split('\n').forEach(function(line){
	if (line.match(/\$import\(.(.+).\);/)){
		files.push(RegExp.$1);
	}
});


var cfg = {
	sourceMappingURLPrefix: 'https://unpkg.com/getlibs@' + version
};


gulp.task('lint', function(){
	return gulp.src(files, {base: './'})
		.pipe(eslint())
		.pipe(eslint.format('unix'))
		.pipe(eslint.failAfterError());
});


gulp.task('source', ['lint'], function() {

	return gulp.src(files, {base: './'})
		.pipe(sourcemaps.init())
		.pipe(concat('src.js'))
		.pipe(header('(function(){\n'))
		.pipe(footer('\n})()'))
		.pipe(sourcemaps.write('', cfg))
		.pipe(gulp.dest(''));
});


gulp.task('minified', ['lint'], function() {

	return gulp.src(files, {base: './'})
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('min.js'))
		.pipe(header('(function(){'))
		.pipe(footer('})()'))
		.pipe(sourcemaps.write('', cfg))
		.pipe(gulp.dest(''));
});


gulp.task('default', ['source', 'minified']);

