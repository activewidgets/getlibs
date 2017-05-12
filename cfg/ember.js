
SystemJS.config({

	packages: {
		'ember': {main: 'ember.min.js', meta: {'*.js': {format: 'global', deps: ['jquery']}}}
	},

	map: {
		'ember': 'https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.13.0',
		'ember-template-compiler': 'https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.13.0/ember-template-compiler.js'
	}
});
