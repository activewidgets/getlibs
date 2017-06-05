
define('getlibs/plugins/babel', ['../src/worker'], function(WebWorker){

	function transpiler(){

		self.translate = function(address, source, options) {

			options.ast = false;
			options.filename = address;
			options.sourceFileName = address;

			/* global Babel */
			return Babel.transform(source, options);
		};
	}


	var worker = new WebWorker(['babel-standalone', transpiler]),
		options = SystemJS.babelOptions;


	function translate(load){
		return worker.call('translate', load.address, load.source, options).then(function(result){
			load.metadata.sourceMap = result.map;
			return result.code;
		});
	}


	return {
		translate: translate
	};
});