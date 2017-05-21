
SystemJS.config({

	packages: {

		'lodash': {main: 'lodash.min.js', defaultExtension: 'js', meta: {
			'lodash.min.js': {loader: 'cdnjs'},
			'lodash.js': {loader: 'cdnjs'},
			'*': {loader: 'pkg/*'}
		}}
	},

	map: {
		'lodash': '@cdnjs/lodash.js'
	}
});
