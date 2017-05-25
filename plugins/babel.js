
SystemJS.amdDefine('getlibs/plugins/plugin-babel', ['getlibs/utils/worker'], function(WebWorker){

	function transpiler(){

		self.translate = function(address, source, options) {

			/* global Babel */

			options.ast = false;
			options.filename = address;
			options.sourceFileName = address;

			return Babel.transform(source, options);
		};
	}


	var worker = new WebWorker(['babel-standalone', transpiler]),
		options = SystemJS.babelOptions;


	function translate(load){
		return worker.call('translate', load.address, load.source, options).then(function(result){
			load.source = result.code;
			load.metadata.sourceMap = result.map;
			return load.source;
		});
	}


	return {
		translate: translate
	};
});