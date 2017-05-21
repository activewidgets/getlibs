
SystemJS.config({

	packages: {

		'core-js': {main: 'core.min.js', meta: {
			'core.min.js': {loader: 'cdnjs'},
			'core.js': {loader: 'cdnjs'},
			'*': {loader: 'pkg'}
		}}
	},

	map: {
		'core-js': '@cdnjs/core-js'
	}
});
