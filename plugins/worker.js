
SystemJS.amdDefine('getlibs/utils/worker', [], function(){


	function remote(){

		var port = self;

		self.onmessage = function(event){

			var request = JSON.parse(event.data);

			try {
				port.postMessage(JSON.stringify({
					id: request.id,
					result: self[request.method].apply(self, request.args)
				}));
			}
			catch(err){
				port.postMessage(JSON.stringify({
					id: request.id,
					error: err
				}));
			}
		};


		self.onconnect = function(event){
			port = event.ports[0];
			port.onmessage = self.onmessage;
		};
	}


	function createWorker(scripts){

		var source = scripts.concat(remote).map(function(item){

			if (typeof item == 'string'){
				return 'importScripts(' + JSON.stringify(System.normalizeSync(item)) + ');\n';
			}

			if (typeof item == 'function'){
				return '(' + item + ')();\n';
			}
		});

		var blob = new Blob(source, {type: 'application/javascript'});

		return new Worker(URL.createObjectURL(blob));
	}


	return function(scripts){

		var serial = 0,
			tasks = [];


		var worker = createWorker(scripts);


		worker.onmessage = function(e){

			var msg = JSON.parse(e.data),
				task = tasks[msg.id];

			tasks[msg.id] = null;

			if (msg.error) {
				task.failure(msg.error);
			}
			else {
				task.success(msg.result);
			}
		};


		this.call = function(method){

			var i, args = [], id = ++serial;

			for(i=1; i<arguments.length; i++){
				args[i-1] = arguments[i];
			}

			return new Promise(function(success, failure){

				tasks[id] = {
					success: success,
					failure: failure
				};

				worker.postMessage(JSON.stringify({
					id: id,
					method: method,
					args: args
				}));
			});
		};
	};
});