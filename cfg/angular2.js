
SystemJS.config({

	packages: {
		'@angular/core': {main: 'bundles/core.umd.min.js', meta: {'*.js': {deps: ['core-js', 'zone.js', 'rxjs']}}},
		'@angular/common': {main: 'bundles/common.umd.min.js'},
		'@angular/compiler': {main: 'bundles/compiler.umd.min.js'},
		'@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js'},
		'@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'}
	},

	map: {
		'rxjs/Observable': 'fn:rxjs',
		'rxjs/observable/merge': 'fn:rxjs.Observable',
		'rxjs/operator/share': 'fn:rxjs.Observable.prototype',
		'rxjs/Subject': 'fn:rxjs'
	}
});


SystemJS.amdDefine('fn:rxjs', ['rxjs'], function(Rx){return Rx;});
SystemJS.amdDefine('fn:rxjs.Observable', ['rxjs'], function(Rx){return Rx.Observable;});
SystemJS.amdDefine('fn:rxjs.Observable.prototype', ['rxjs'], function(Rx){return Rx.Observable.prototype;});

