
SystemJS.config({

	packages: {
		'react': {main: 'react', defaultExtension: 'min.js'}
	},

	map: {
		'react': 'cdn:react',
		'react-dom': 'cdn:react/react-dom'
	}
});

