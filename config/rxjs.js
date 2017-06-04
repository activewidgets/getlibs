
config({

	packages: {

		'rxjs': {main: 'Rx.min.js', meta: {
			'observable/*': {loader: 'pkg/Observable'},
			'operator/*': {loader: 'pkg/Observable.prototype'},
			'Rx.min.js': {loader: 'cdn'},
			'Rx.js': {loader: 'cdn'},
			'*': {loader: 'pkg'}
		}}
	},

	map: {
		'rxjs': '@reactivex/rxjs',
		'rxjs/Rx': '@reactivex/rxjs',
		'@reactivex/rxjs': '@reactivex/rxjs'
	}
});
