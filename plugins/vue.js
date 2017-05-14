
SystemJS.amdDefine('getlibs/plugins/vue', [], function(){

	var reTemplate = /<template>([\s\S]*)<\/template>/,
		reScript = /<script>([\s\S]*)<\/script>/,
		reStyle = /<style>([\s\S]*)<\/style>/;

	function translate(load){

		var source, template, style;

		if (load.source.match(reTemplate)){
			template = RegExp.$1;
		}

		template = JSON.stringify(template || '');

		if (load.source.match(reScript)){
			source = RegExp.$1;
		}

		if (!source) {
			source = 'module.exports={}';
		}

		source += '\n module.exports.template = ' + template;

		if (load.source.match(reStyle)){
			style = RegExp.$1;
		}

		if (style){

			var el = document.createElement('style');

			if (el.styleSheet) {
				el.styleSheet.cssText = style;
			}
			else {
				el.appendChild(document.createTextNode(style));
			}

			document.head.appendChild(el);
		}

		load.source = source;

		return source;
	}


	return {
		translate: translate
	};
});
