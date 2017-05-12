
SystemJS.config({

	packages: {
		'react': {main: 'dist/react.min.js'},
		'react-dom': {main: 'dist/react-dom.min.js'}
	},

	map: {
		'react': 'https://unpkg.com/react'
	}
});

