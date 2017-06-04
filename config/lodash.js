
SystemJS.config({

	packages: {

		'lodash': {main: 'lodash.min.js', defaultExtension: 'js', meta: {
			'lodash.min.js': {loader: 'cdn'},
			'lodash.js': {loader: 'cdn'},
			'*': {loader: 'pkg/*'}
		}}
	}

});
