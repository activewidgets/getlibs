
define('getlibs/plugins/index', [], function(){

	function fetch(load, fallback){

		function retry(err){

			if (String(err.message).indexOf('No access to files') == 0){
				throw err;
			}

			var address = load.address,
				index = address.replace(/\.(ts|js)$/, '/index.$1'),
				ext = RegExp.$1,
				path = JSON.stringify(index),
				source = (ext == 'ts') ?
					'export * from ' + path :
					'module.exports = require(' + path + ')';

			if (address.match(/\.(ts|js)$/) && !address.match(/index\.(ts|js)$/)){
				return source;
			}

			throw err;
		}


		return Promise.resolve(fallback(load)).catch(retry);
	}


	return {
		fetch: fetch
	};
});

