
config({

	packages: {
		'@angular/core': {main: 'bundles/core.umd.min.js', meta: {'*.js': {deps: ['core-js', 'zone.js', 'rxjs']}}},
		'@angular/common': {main: 'bundles/common.umd.min.js'},
		'@angular/compiler': {main: 'bundles/compiler.umd.min.js'},
		'@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js'},
		'@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'},
		'@angular/forms': {main: 'bundles/forms.umd.min.js'},
		'@angular/http': {main: 'bundles/http.umd.min.js'},
		'@angular/router': {main: 'bundles/router.umd.min.js'}
	}

});
