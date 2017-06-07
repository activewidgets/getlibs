
define('getlibs/plugins/files', [], function(){


	function fileAccessWarning(){
		/* eslint no-console: "off" */
		console.warn("Allow file access when running directly from files: http://getlibs.com/allow-file-access.html");

		var e = document.createElement('div');
		e.innerHTML = '<div style="border: 1px solid red; padding: 30px; background: #fff; position: fixed; top: 20px; left: 20px;">' +
			'getlibs error: file access not allowed (<a href="http://getlibs.com/allow-file-access.html">more info</a>)' +
		'</div>';
		document.body.appendChild(e);
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

