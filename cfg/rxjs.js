
SystemJS.config({

	packages: {

		'rxjs': {main: 'Rx.min.js', meta: {
			'observable/*': {loader: 'pkg/Observable'},
			'operator/*': {loader: 'pkg/Observable.prototype'},
			'Rx.min.js': {loader: ''},
			'Rx.js': {loader: ''},
			'*': {loader: 'pkg'}
		}}
	},

	map: {
		'rxjs': 'https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.4.0'
	}
});
