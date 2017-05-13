
var fs = require('fs'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
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
		.pipe(concat('min.js'))
		.pipe(sourcemaps.write('', cfg))
		.pipe(gulp.dest(''));
});


gulp.task('default', ['source', 'minified']);

