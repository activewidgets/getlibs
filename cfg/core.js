
SystemJS.config({

	packages: {

		'core-js': {main: 'core.min.js', meta: {
			'core.min.js': {loader: 'cdn'},
			'core.js': {loader: 'cdn'},
			'*': {loader: 'pkg'}
		}}
	}

});
