
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

		'babel-standalone': 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.2',
		'typescript': 'https://cdnjs.cloudflare.com/ajax/libs/typescript/2.3.4',

		'plugins': 'getlibs/plugins'
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
		'*.hbs': {loader: 'hbs'}
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
	'plugins/cached',
	'plugins/babel'
]);


define.loader('js', [
	'plugins/scan',
	'plugins/roots',
	'plugins/index',
	'plugins/files'
]);


define.loader('ts', [
	'plugins/scan',
	'plugins/roots',
	'plugins/index',
	'plugins/files',
	'plugins/cached',
	'plugins/typescript'
]);