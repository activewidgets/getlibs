
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
		'main.js': './main.js',
		'main.ts': './main.ts',
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



(function(){

	// intercept System.import() for typescript auto config

	function applyTypescript(url){

		var packages = {},
			base = System.resolveSync(url);

		if (!System.resolveSync('./aaaa', base).match(/\.ts$/)){
			packages[System.resolveSync('.', base)] = {defaultExtension: 'ts'};
			System.config({packages: packages});
		}
	}

	var _import = System.import;

	System.import = function(url){

		if (String(url).match(/^[^!]+\.ts$/) && arguments.length == 1){
			applyTypescript(url);
		}

		return _import.apply(this, arguments);
	};

})();