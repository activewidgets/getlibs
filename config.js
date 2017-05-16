
SystemJS.config({

	baseURL: 'https://unpkg.com/',

	packages: {
		'./': {defaultExtension: 'js'},
		'plugin-typescript': {main: 'lib/plugin.js'},
		'typescript': {main: 'typescript.min.js', meta: {'*.js': {exports: 'ts'}}},
		'pkg': {main: '@@', defaultExtension: '', meta: {'*': {loader: 'getlibs/loader/package'}}}
	},

	map: {
		'src': './src',
		'main': './main',
		'app': './app',
		'vendor': './vendor',

		'ts': 'getlibs/plugins/typescript',
		'css': 'systemjs-plugin-css',
		'text': 'systemjs-plugin-text',
		'json': 'getlibs/plugins/json',
		'hbs': 'getlibs/plugins/handlebars',
		'vue-loader': 'getlibs/plugins/vue',

		'typescript': 'cdn:typescript',
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
		emitDecoratorMetadata: true,
		experimentalDecorators: true
	},

	babelOptions: {
		react: true
	},

	transpiler: 'getlibs/plugins/babel'
});


SystemJS.config.ts = function(){
	SystemJS.config({
		packages: {
			'./': {defaultExtension: 'ts'},
		}
	});
};