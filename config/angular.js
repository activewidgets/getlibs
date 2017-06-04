
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
	},

	map: {
		'@angular/core': '@angular/core@4.1.3',
		'@angular/common': '@angular/common@4.1.3',
		'@angular/compiler': '@angular/compiler@4.1.3',
		'@angular/platform-browser': '@angular/platform-browser@4.1.3',
		'@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic@4.1.3',
		'@angular/forms': '@angular/forms@4.1.3',
		'@angular/http': '@angular/http@4.1.3',
		'@angular/router': '@angular/router@4.1.3'
	}

});
