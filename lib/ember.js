
SystemJS.config({

	map: {
		'ember': '@ember/ember.min.js',
		'ember-template-compiler': '@ember/ember-template-compiler.js'
	},

	meta: {
		'ember': {deps: ['jquery', 'ember-template-compiler'], format: 'global'},
		'ember-template-compiler': {format: 'global'}
	},

	paths: {
		'@ember': 'https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.13.0'
	}
});
