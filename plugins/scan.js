
define('getlibs/plugins/scan', [], function(){

	var angularPreloaded;

	function angular(load){

		var reTemplateUrl = /(\btemplateUrl\s*:\s*['"`])(\..*?)([`"'])/g,
			reStyleUrls = /(\bstyleUrls\s*:\s*\[)([^\]]*?)(\])/g,
			reUrl = /(['"`])(\..*?)([`"'])/g,
			source = String(load.source);

		if (!angularPreloaded && source.indexOf('@angular/platform-browser-dynamic') >= 0){

			angularPreloaded = true;

			System.preload([
				'core-js',
				'zone.js',
				'rxjs',
				'@angular/core',
				'@angular/common',
				'@angular/platform-browser',
				'@angular/compiler',
				'@angular/platform-browser-dynamic'
			]);
		}

		function absoluteUrl(match, before, url, after){
			return before + System.resolveSync(url, load.address) + after;
		}

		function styleUrls(match, before, urls, after){
			return before + urls.replace(reUrl, absoluteUrl) + after;
		}

		if (source.indexOf('moduleId') == -1) {
			load.source = source.replace(reTemplateUrl, absoluteUrl).replace(reStyleUrls, styleUrls);
		}
	}


	function scan(load){

		var source = String(load.source);

		if (source.indexOf('@angular') >= 0) {
			angular(load);
		}
	}


	var baseURL = SystemJS.baseURL;

	function translate(load){

		if (String(load.address).substr(0, baseURL.length) != baseURL){
			scan(load);
		}
	}


	return {
		translate: translate
	};
});

