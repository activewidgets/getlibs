
define('getlibs/plugins/typescript', ['../src/worker'], function(WebWorker){

	function transpiler(){

		self.translate = function(address, source, options) {

			/* global ts */
			var result = ts.transpileModule(source, {
				compilerOptions: options,
				reportDiagnostics: true,
				moduleName: address,
				fileName: address
			});

			result.diagnostics.forEach(function(item){
				item.file = null;
			});

			return result;
		};
	}


	var worker = new WebWorker(['typescript', transpiler]),
		options = SystemJS.typescriptOptions;


	function error(items, address, source){

		var item = items[0],
			parts = source.substr(0, item.start).split('\n'),
			line = parts.length,
			message = item.messageText + ' (line: ' + line + ')\n\n' +
				source.split('\n')[line-1] + '\n' +
				parts[line-1].replace(/\S/g, ' ') + '^';

		return new Error(message);
	}


	function translate(load){
		return worker.call('translate', load.address, load.source, options).then(function(result){

			if (result.diagnostics.length){
				throw error(result.diagnostics, load.address, load.source);
			}

			load.source = result.outputText.replace(/^\/\/# sourceMappingURL=.+/m, '');
			load.metadata.sourceMap = JSON.parse(result.sourceMapText);
			return load.source;
		});
	}


	return {
		translate: translate
	};
});