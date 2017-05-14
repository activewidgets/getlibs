
SystemJS.config({

	baseURL: 'https://unpkg.com/',

	packages: {
		'ts': {main: 'lib/plugin.js'},
		'typescript': {main: 'typescript.min.js', meta: {'*.js': {exports: 'ts'}}},
	},

	map: {
		'src': './src',
		'vendor': './vendor',

		'ts': 'plugin-typescript',
		'css': 'systemjs-plugin-css',
		'text': 'systemjs-plugin-text',
		'json': 'getlibs/plugins/json',
		'hbs': 'getlibs/plugins/handlebars',
		'vue-loader': 'getlibs/plugins/vue',

		'typescript': 'https://cdnjs.cloudflare.com/ajax/libs/typescript/2.3.2',
		'plugin-babel': 'systemjs-plugin-babel/plugin-babel.js',
		'systemjs-babel-build': 'systemjs-plugin-babel/systemjs-babel-browser.js'
	},

	meta: {
		'*.ts': {loader: 'ts'},
		'*.css': {loader: 'css'},
		'*.txt': {loader: 'text'},
		'*.htm': {loader: 'text'},
		'*.html': {loader: 'text'},
		'*.json': {loader: 'json'},
		'*.hbs': {loader: 'hbs'},
		'*.vue': {loader: 'vue-loader'}
	},

	typescriptOptions: {
		experimentalDecorators: true
	},

	babelOptions: {
		react: true
	},

	transpiler: 'plugin-babel'
});
