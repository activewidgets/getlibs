
SystemJS.config({

	baseURL: 'https://unpkg.com/',

	packages: {
		'ts': {main: 'lib/plugin.js'},
		'typescript': {main: 'lib/typescript.js', meta: {'lib/typescript.js': {exports: 'ts'}}}
	},

	map: {
		'ts': 'plugin-typescript',
		'css': 'systemjs-plugin-css/css.js',
		'text': 'systemjs-plugin-text/text.js',

		'plugin-babel': 'systemjs-plugin-babel/plugin-babel.js',
		'systemjs-babel-build': 'systemjs-plugin-babel/systemjs-babel-browser.js'
	},

	meta: {
		'*.ts': {loader: 'ts'},
		'*.css': {loader: 'css'},
		'*.html': {loader: 'text'}
	},

	typescriptOptions: {
		experimentalDecorators: true
	},

	babelOptions: {
		react: true
	},

	transpiler: 'plugin-babel'
});
