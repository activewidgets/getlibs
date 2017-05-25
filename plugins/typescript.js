
SystemJS.amdDefine('getlibs/plugins/typescript', ['getlibs/utils/worker'], function(WebWorker){

	function transpiler(){

		self.translate = function(address, source, options) {

			/* global ts */
			return ts.transpileModule(source, {
				compilerOptions: options,
				moduleName: address,
				fileName: address
			});
		};
	}


	var worker = new WebWorker(['typescript', transpiler]),
		options = SystemJS.typescriptOptions;


	function translate(load){
		return worker.call('translate', load.address, load.source, options).then(function(result){
			load.source = result.outputText.replace(/^\/\/# sourceMappingURL=.+/m, '');
			load.metadata.sourceMap = JSON.parse(result.sourceMapText);
			return load.source;
		});
	}


	return {
		translate: translate
	};
});