
SystemJS.config({

	baseURL: 'https://unpkg.com/',

	packages: {
		'activewidgets': {main: 'dist/ax.js'},
		'react': {main: 'dist/react.js'},
		'react-dom': {main: 'dist/react-dom.js'}
	},

	map: {
		'activewidgets': 'https://cdn.activewidgets.com/',

		'css': 'systemjs-plugin-css@0.1.33/css.js',
		'text': 'systemjs-plugin-text@0.0.9/text.js',

		'plugin-babel': 'systemjs-plugin-babel@0.0.21/plugin-babel.js',
		'systemjs-babel-build': 'systemjs-plugin-babel@0.0.21/systemjs-babel-browser.js'
	},

	meta: {
		'*.css': {loader: 'css'},
		'*.html': {loader: 'text'}
	},

    babelOptions: {
        es2015: true,
		stage3: true,
		stage2: false,
		stage1: false,
		react: true
    },

	transpiler: 'plugin-babel'
});
