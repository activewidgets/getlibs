
SystemJS.amdDefine('getlibs/plugins/typescript', [], function(){

	function typescript(loader, load, traceOpts){
		return System.import('plugin-typescript').then(function(plugin){
			return plugin.translate.call(loader, load, traceOpts);
		});
	}


	function translate(load, traceOpts){

		var source = load.source,
			address = load.address,
			sourceKey = 'getlibs\ttypescript\tsource\t' + address,
			transpiledKey = 'getlibs\ttypescript\ttranspiled\t' + address,
			sourceMapKey = 'getlibs\ttypescript\tsourcemap\t' + address;

		if (localStorage.getItem(sourceKey) === source){
			load.metadata.sourceMap = JSON.parse(localStorage.getItem(sourceMapKey));
			return localStorage.getItem(transpiledKey);
		}

		scan(load);

		return typescript(this, load, traceOpts).then(function(transpiled){
			localStorage.setItem(sourceKey, source);
			localStorage.setItem(transpiledKey, transpiled);
			localStorage.setItem(sourceMapKey, JSON.stringify(load.metadata.sourceMap));
			return transpiled;
		});
	}


	function scan(load){

		var source = load.source;

		if (source.indexOf('@angular') >= 0) {
			angular(load);
		}
	}


	function angular(load){

		var reTemplateUrl = /(\btemplateUrl\s*:\s*['"`])(\..*?)([`"'])/g;

		if (load.source.indexOf('moduleId') == -1) {
			load.source = load.source.replace(reTemplateUrl, function(match, before, url, after){
				return before + System.resolveSync(url, load.address) + after;
			});
		}
	}


	return {
		translate: translate
	};
});
