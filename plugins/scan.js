
SystemJS.amdDefine('getlibs/plugins/scan', [], function(){


	function angular(load){

		var reTemplateUrl = /(\btemplateUrl\s*:\s*['"`])(\..*?)([`"'])/g,
			reStyleUrls = /(\bstyleUrls\s*:\s*\[)([^\]]*?)(\])/g,
			reUrl = /(['"`])(\..*?)([`"'])/g;

		function absoluteUrl(match, before, url, after){
			return before + System.resolveSync(url, load.address) + after;
		}

		function styleUrls(match, before, urls, after){
			return before + urls.replace(reUrl, absoluteUrl) + after;
		}

		if (load.source.indexOf('moduleId') == -1) {
			load.source = load.source
				.replace(reTemplateUrl, absoluteUrl)
				.replace(reStyleUrls, styleUrls);
		}
	}


	function build(base){

		var loader = {};

		Object.keys(base).forEach(function(i){
			loader[i] = base[i];
		});

		loader.translate = function(load){

			var source = load.source;

			if (source.indexOf('@angular') >= 0) {
				angular(load);
			}

			return base.translate ? base.translate(load) : load.source;
		};

		return loader;
	}


	function skip(){
		return ''
	}


	function instantiate(load){
		return System.import(load.address).then(build);
	}


	return {
		fetch: skip,
		instantiate: instantiate
	};
});

