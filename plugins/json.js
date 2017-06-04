
define('getlibs/plugins/json', [], function(){
	return {
		instantiate: function(load) {
			return JSON.parse(load.source);
		}
	};
});
