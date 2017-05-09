
SystemJS.config({

	baseURL: 'https://unpkg.com/',

	packages: {
		'activewidgets': {main: 'dist/ax.js'},
		'core-js': {main: 'client/shim.min.js'},

		'inferno': {main: 'dist/inferno.js'},
		'inferno-component': {main: 'dist/inferno-component.js'},
		'inferno-create-element': {main: 'dist/inferno-create-element.js'},

		'react': {main: 'dist/react.js'},
		'react-dom': {main: 'dist/react-dom.js'},

		'rxjs': {main: 'bundles/Rx.min.js'},

		'ts': {main: 'lib/plugin.js'},
		'typescript': {main: 'lib/typescript.js', meta: {'lib/typescript.js': {exports: 'ts'}}}
	},

	map: {
		'activewidgets': '@activewidgets',

		'ember': '@ember/ember.min.js',
		'ember-template-compiler': '@ember/ember-template-compiler.js',

		'rxjs/Observable': 'rxjs',
		'rxjs/observable/merge': '@rxjs.Observable',
		'rxjs/operator/share': '@rxjs.Observable.prototype',
		'rxjs/Subject': 'rxjs',

		'ts': 'plugin-typescript',
		'css': 'systemjs-plugin-css/css.js',
		'text': 'systemjs-plugin-text/text.js',

		'plugin-babel': 'systemjs-plugin-babel/plugin-babel.js',
		'systemjs-babel-build': 'systemjs-plugin-babel/systemjs-babel-browser.js'
	},

	meta: {
		'@angular/core': {deps: ['core-js', 'zone.js']},

		'ember': {deps: ['jquery', 'ember-template-compiler'], format: 'global'},
		'ember-template-compiler': {format: 'global'},

		'*.ts': {loader: 'ts'},
		'*.css': {loader: 'css'},
		'*.html': {loader: 'text'}
	},

	paths: {
		'@activewidgets': 'https://cdn.activewidgets.com/',
		'@ember': 'https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.13.0'
	},

	typescriptOptions: {
		experimentalDecorators: true
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


// @angular hacks
SystemJS.amdDefine('@rxjs.Observable', ['rxjs'], function(Rx){return Rx.Observable;});
SystemJS.amdDefine('@rxjs.Observable.prototype', ['rxjs'], function(Rx){return Rx.Observable.prototype;});
