
SystemJS.amdDefine('getlibs/plugins/cdnjs', ['getlibs/plugins/preload'], function(preload){

	var init = System.import('https://api.cdnjs.com/libraries!json').then(function(response){

		var libs = {}, map = {"angular.js": "angular", "10up-sanitize.css":"sanitize.css","accounting.js":"accounting","alertify.js":"alertify","AlertifyJS":"alertifyjs","alexandernst-angular-multi-select":"angular-multi-select","angular-autofields":"angular-autoFields-bootstrap","audio5js":"audio5","aui":"@atlassian/aui","babel-core":"babel-browser","backbone-localstorage.js":"backbone.localstorage","backbone.collectionView":"bb-collection-view","backbone.js":"backbone","backbone.validation":"backbone-validation","bacon.js":"baconjs","baffle.js":"baffle","basis.js":"basis-library","bespoke.js":"bespoke","bokeh":"bokehjs","breezejs":"breeze-client","camanjs":"caman","can.js":"can","cannon.js":"cannon","cash":"cash-dom","Chart.js":"chart.js","ClientJS":"clientjs","clipboard.js":"clipboard","Colors.js":"colors.js","cookie.js":"cookie_js","Cookies.js":"cookies-js","css-loader":"pure-css-loader","custom-elements-builder":"ceb","custom-elements":"@webcomponents/custom-elements","dancer.js":"dancer","danialfarid-angular-file-upload":"ng-file-upload","danielgindi-jquery-backstretch":"jquery.backstretch","data.js":"data_js","datepicker":"@fengyuanchen/datepicker","dio":"dio.js","dropbox.js":"dropbox","Dropify":"dropify","dygraph":"dygraphs","elasticsearch":"elasticsearch-browser","eModal":"emodal","Faker":"faker","file-uploader":"fine-uploader","FileSaver.js":"file-saver","forge":"node-forge","graingert-wow":"wow.js","Han":"han-css","handlebars.js":"handlebars","headroom":"headroom.js","hola-video.js":"@hola.org/video.js","ICanHaz.js":"icanhaz","idbwrapper":"idb-wrapper","ifvisible":"ifvisible.js","ion.checkradio":"ion-checkradio","javascript-hooker":"hooker","jquery-browser":"jquery.browser","jquery-easing":"jquery.easing","jquery-jgrowl":"jgrowl","jQuery-linkify":"linkifyjs","jquery-minicolors":"@claviska/jquery-minicolors","jquery-noty":"noty","jquery.imagesloaded":"imagesloaded","jquery.isotope":"isotope-layout","jquery.lazyloadxt":"lazyloadxt","jQuery.Marquee":"jquery.marquee","jQuery.my":"jquerymy","jquery.simpleWeather":"simpleweather","jquery.tabslet.js":"tabslet","jquery.textcomplete":"jquery-textcomplete","jquery.ui-contextmenu":"ui-contextmenu","jquery.wookmark":"wookmark","jqueryui-touch-punch":"jquery-ui-touch-punch","js-xss":"xss","jsdiff":"diff","json-formatter":"jsonformatter","kineticjs":"kinetic","knockout-validation":"knockout.validation","leaflet-locatecontrol":"leaflet.locatecontrol","leaflet.draw":"leaflet-draw","less.js":"less","line-chart":"n3-charts","lunr.js":"lunr","machina.js":"machina","markdown.js":"markdown","mindb":"min","MinPubSub":"minpubsub","mistic100-Bootstrap-Confirmation":"bootstrap-confirmation2","moment.js":"moment","multi-select":"multiselect","MutationObserver.js":"mutationobserver-shim","mycolorway-simple-hotkeys":"simple-hotkeys","ngOfficeUiFabric":"ng-office-ui-fabric","nod":"nod-validate","normalize":"normalize.css","notify.js":"notifyjs","numeral.js":"numeral","oauth-io":"oauthio-web","odometer.js":"odometer","ol3":"openlayers","onsen":"onsenui","p2.js":"p2","p5.js":"p5","parsley.js":"parsleyjs","pdf.js":"pdfjs-dist","pegasus":"@typicode/pegasus","perliedman-leaflet-control-geocoder":"leaflet-control-geocoder","pickadate.js":"pickadate","plastiq":"angular-moment","plottable.js":"plottable","portal":"portal-client","postal.js":"postal","Primer":"primer-css","prism":"prismjs","proj4js":"proj4","pure":"purecss","q.js":"q","qunit":"qunitjs","ramjet.js":"ramjet","remoteStorage":"remotestoragejs","Repaintless.css":"repaintless","retina.js":"retinajs","roll":"rolljs","rxjs":"@reactivex/rxjs","scion":"scxml","script.js":"scriptjs","ScrollMagic":"scrollmagic","should.js":"should","Shuffle":"shufflejs","sigma.js":"sigma","simple-gallery-js":"simpleGallery.js","smoothscroll":"smoothscroll-for-websites","socket.io":"socket.io-client","sprintf":"sprintf-js","stacktrace.js":"stacktrace-js","stomp.js":"stompjs","string.js":"string","Swiper":"swiper","tabletop.js":"tabletop","teleject-hisrc":"hisrc","tinycolor":"tinycolor2","tracking.js":"tracking","Turf.js":"@turf/turf","twitter-bootstrap":"bootstrap","twix.js":"twix","UAParser.js":"ua-parser-js","Uniform.js":"jquery.uniform","Vidage":"vidage","weather":"weather.js","whitestorm.js":"whs","wordcloud2.js":"wordcloud","xls":"xlsjs","yasqe":"yasgui-yasqe","yasr":"yasgui-yasr","Zebra_datepicker":"zebra_datepicker"};

		response.results.forEach(function(item){
			libs[map[item.name] || item.name] = item;
		});

		return libs;
	});


	var exceptions = ['@angular/', 'inferno/'],
		baseURL = SystemJS.baseURL;


	function notcdnjs(url){
		return url.indexOf(baseURL) != 0 || exceptions.some(function(item){
			return url.indexOf(baseURL + item) == 0;
		});
	}


	function build(base){

		var plugin = {};

		Object.keys(base).forEach(function(i){
			plugin[i] = base[i];
		});

		plugin.fetch = function(load, fetch){

			var loader = this;

			function fetchDefault(){
				var result = base.fetch ? base.fetch.call(loader, load, fetch) : fetch.call(loader, load);
				return Promise.resolve(result).then(preload(load.address));
			}

			if (notcdnjs(load.address)){
				return fetchDefault();
			}

			return init.then(function(libs){

				var name = load.address.substr(baseURL.length).replace(/^([^@\/]+|@[^\/]+\/[^\/]+)(.*)$/, '$1'),
					file = RegExp.$2,
					item = libs[name];

				if (!item){
					return fetchDefault();
				}

				var redirect = item.latest;

				if (file){

					if (!file.match(/\.\w+$/)){
						file += '.min.js';
					}

					redirect = item.latest.replace(/^(.+\/ajax\/libs\/[^\/]+\/[^\/]+)\/.+$/, '$1') + file;
				}

				load.source = 'module.exports = require(' + JSON.stringify(redirect) + ')';


				var map = System.preload.map,
					prev = map[load.address];

				if (prev) {
					map[redirect] = prev;
				}

				return load.source;
			});
		}

		return plugin;
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


(function(){

	SystemJS.config({
		meta: {
			'https://unpkg.com/*': {loader: 'cdn'},
			'https://cdnjs.cloudflare.com/*.js': {loader: 'cdn'},
			'getlibs/*': {loader: ''}
		}
	});


	var path, meta = {}, current = SystemJS.meta;

	for(path in current){
		if (path.indexOf('*.') == 0 && current[path].loader) {
			meta['https://unpkg.com/' + path] = {loader: SystemJS.normalizeSync(current[path].loader) + '!getlibs/plugins/cdnjs'};
		}
	}

	meta['https://unpkg.com/*.js'] = {loader: 'cdn'};

	SystemJS.config({
		meta: meta
	});

})();