
config({

	baseURL: 'https://unpkg.com/',

	packages: {
		'babel-standalone': {main: 'babel.min.js'},
		'typescript': {main: 'typescript.min.js', meta: {'*': {exports: 'ts'}}},
		'cdn': {main: '@@', defaultExtension: '', meta: {'*': {loader: 'getlibs/loader/cdnjs'}}},
		'pkg': {main: '@@', defaultExtension: '', meta: {'*': {loader: 'getlibs/loader/package'}}}
	},

	map: {
		'src': './src',
		'app': './app',

		'css': 'systemjs-plugin-css',
		'text': 'systemjs-plugin-text',
		'json': 'getlibs/plugins/json',
		'hbs': 'getlibs/plugins/handlebars',
		'vue-loader': 'getlibs/plugins/vue',

		'babel-standalone': 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.2',
		'typescript': 'https://cdnjs.cloudflare.com/ajax/libs/typescript/2.3.2'
	},

	meta: {
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
		sourceMap: true,
		presets: ['es2015', 'stage-3', 'stage-2', 'react'],
		plugins: ['transform-es2015-modules-systemjs']
	},

	transpiler: '@babel'
});


define.loader('@babel', [
	'getlibs/plugins/cached',
	'getlibs/plugins/babel'
]);


define.loader('js', [
	'getlibs/plugins/scan',
	'getlibs/plugins/index'
]);


define.loader('ts', [
	'getlibs/plugins/scan',
	'getlibs/plugins/index',
	'getlibs/plugins/cached',
	'getlibs/plugins/typescript'
]);