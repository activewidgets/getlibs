
define('getlibs/plugins/files', [], function(){


	function fileAccessWarning(){
		/* eslint no-console: "off" */
		console.warn("Allow file access when running directly from files: http://getlibs.com/allow-file-access.html");
	}


	var loadingFromFiles = (location.protocol == 'file:'),
		fileAccessAllowed;



	function fetch(load, fallback){

		function ok(source){

			if (loadingFromFiles && load.address.indexOf('file:') == 0){
				fileAccessAllowed = true;
			}

			return source;
		}

		function fail(err){

			if (loadingFromFiles && !fileAccessAllowed){
				setTimeout(fileAccessWarning, 100);
				throw new Error('No access to files or wrong path: ' + load.address);
			}

			throw err;
		}


		return Promise.resolve(fallback(load)).then(ok, fail);
	}


	return {
		fetch: fetch
	};
});

