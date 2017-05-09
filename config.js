
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

		'rxjs': {main: 'bundles/Rx.min.js'}
	},

	map: {
		'activewidgets': 'https://cdn.activewidgets.com/',

		'rxjs/Observable': 'rxjs',
		'rxjs/observable/merge': '@rxjs.Observable',
		'rxjs/operator/share': '@rxjs.Observable.prototype',
		'rxjs/Subject': 'rxjs',

		'css': 'systemjs-plugin-css@0.1.33/css.js',
		'text': 'systemjs-plugin-text@0.0.9/text.js',

		'plugin-babel': 'systemjs-plugin-babel@0.0.21/plugin-babel.js',
		'systemjs-babel-build': 'systemjs-plugin-babel@0.0.21/systemjs-babel-browser.js'
	},

	meta: {
		'@angular/core': {deps: ['core-js', 'zone.js']},

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


// @angular hacks
SystemJS.amdDefine('@rxjs.Observable', ['rxjs'], function(Rx){return Rx.Observable;});
SystemJS.amdDefine('@rxjs.Observable.prototype', ['rxjs'], function(Rx){return Rx.Observable.prototype;});
