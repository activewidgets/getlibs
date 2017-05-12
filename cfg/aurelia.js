
SystemJS.config({

	bundles: {
		'aurelia-core': [
			'aurelia-binding',
			'aurelia-bootstrapper',
			'aurelia-dependency-injection',
			'aurelia-event-aggregator',
			'aurelia-framework',
			'aurelia-loader',
			'aurelia-loader-default',
			'aurelia-logging',
			'aurelia-logging-console',
			'aurelia-metadata',
			'aurelia-pal',
			'aurelia-pal-browser',
			'aurelia-path',
			'aurelia-polyfills',
			'aurelia-task-queue',
			'aurelia-templating',
			'aurelia-templating-binding',
			'aurelia-templating-resources'
		],

		'aurelia-routing': [
			'aurelia-history',
			'aurelia-history-browser',
			'aurelia-route-recognizer',
			'aurelia-router',
			'aurelia-templating-router'
		]
	},

	map: {
		'aurelia-core':  'https://rawgit.com/aurelia/aurelia/master/scripts/aurelia-core.min.js',
		'aurelia-routing': 'https://rawgit.com/aurelia/aurelia/master/scripts/aurelia-routing.min.js'
	}
});

