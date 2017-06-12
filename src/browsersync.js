
(function(){

	function reload(e){

		if (e.event != 'change' || e.type != 'inject'){
			return;
		}

		var i, address, path = e.path.replace(/\\/g, '/');

		for (;;) {

			address = location.protocol + '//' + location.host + '/' + path;

			if (System.has(address)){
				return System.reload(address);
			}

			i = path.indexOf('/');

			if (i == -1){
				return;
			}

			path = path.substr(i+1);
		}
	}

	var initialized;

	document.addEventListener('load', function(){

		if (initialized || !window.___browserSync___){
			return;
		}

		System.import('https://unpkg.com/systemjs-hmr').then(function(){
			window.___browserSync___.socket.on('file:reload', reload);
		});

	}, true);

})();