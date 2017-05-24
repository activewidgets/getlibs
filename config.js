
SystemJS.config({

	baseURL: 'https://unpkg.com/',

	packages: {
		'plugin-typescript': {main: 'lib/plugin.js'},
		'typescript': {main: 'typescript.min.js', meta: {'*': {exports: 'ts'}}},
		'pkg': {main: '@@', defaultExtension: '', meta: {'*': {loader: 'getlibs/loader/package'}}}
	},

	map: {
		'src': './src',
		'app': './app',

		'js': 'getlibs/plugins/js!getlibs/plugins/scan!getlibs/plugins/index',
		'ts': 'getlibs/plugins/plugin-typescript!getlibs/plugins/cached!getlibs/plugins/scan!getlibs/plugins/index',
		'css': 'systemjs-plugin-css',
		'text': 'systemjs-plugin-text',
		'json': 'getlibs/plugins/json',
		'hbs': 'getlibs/plugins/handlebars',
		'vue-loader': 'getlibs/plugins/vue',

		'cdnjs': 'getlibs/plugins/cdnjs',

		'typescript': 'https://cdnjs.cloudflare.com/ajax/libs/typescript/2.3.2',
		'plugin-babel': 'systemjs-plugin-babel/plugin-babel.js',
		'systemjs-babel-build': 'systemjs-plugin-babel/systemjs-babel-browser.js'
	},

	meta: {

		'@cdnjs/*': {loader: 'cdnjs'},

		'*.js': {loader: 'js'},
		'*.ts': {loader: 'ts'},
		'*.css': {loader: 'css'},
		'*.txt': {loader: 'text'},
		'*.tpl': {loader: 'text'},
		'*.htm': {loader: 'text'},
		'*.html': {loader: 'text'},
		'*.json': {loader: 'json'},
		'*.hbs': {loader: 'hbs'},
		'*.vue': {loader: 'vue-loader'}
	},

	typescriptOptions: {
		module: 'system',
		sourceMap: true,
		emitDecoratorMetadata: true,
		experimentalDecorators: true
	},

	babelOptions: {
		react: true
	},

	transpiler: 'plugin-babel!getlibs/plugins/cached'
});
