
SystemJS.config({

	packages: {
		'@angular/core': {main: 'bundles/core.umd.min.js', meta: {'*.js': {deps: ['core-js', 'zone.js', 'rxjs']}}},
		'@angular/common': {main: 'bundles/common.umd.min.js'},
		'@angular/compiler': {main: 'bundles/compiler.umd.min.js'},
		'@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js'},
		'@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'}
	},

	map: {
		'@angular/core': '@angular/core@4.1.2',
		'@angular/common': '@angular/common@4.1.2',
		'@angular/compiler': '@angular/compiler@4.1.2',
		'@angular/platform-browser': '@angular/platform-browser@4.1.2',
		'@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic@4.1.2'
	}

});
