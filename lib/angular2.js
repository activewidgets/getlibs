
SystemJS.config({

	packages: {
		'core-js': {main: 'client/shim.min.js'},
		'rxjs': {main: 'bundles/Rx.min.js'}
	},

	map: {
		'rxjs/Observable': 'rxjs',
		'rxjs/observable/merge': '@rxjs.Observable',
		'rxjs/operator/share': '@rxjs.Observable.prototype',
		'rxjs/Subject': 'rxjs'
	},

	meta: {
		'@angular/core': {deps: ['core-js', 'zone.js']}
	}
});


SystemJS.amdDefine('@rxjs.Observable', ['rxjs'], function(Rx){return Rx.Observable;});
SystemJS.amdDefine('@rxjs.Observable.prototype', ['rxjs'], function(Rx){return Rx.Observable.prototype;});

