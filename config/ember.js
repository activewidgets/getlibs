
SystemJS.config({

	packages: {
		'ember-source': {main: 'dist/ember.min.js', meta: {'*.js': {format: 'global', deps: ['jquery', './ember-template-compiler']}}}
	},

	map: {
		'ember': 'ember-source'
	}
});

