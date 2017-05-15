
function configure(aurelia){
	aurelia.use.basicConfiguration();
	aurelia.start().then(function(){
		aurelia.setRoot('src/app', document.getElementById('app'));
	});
};

require('aurelia-bootstrapper').bootstrap(configure);
