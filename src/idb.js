
define('getlibs/src/idb', [], function(){

	var store = 'cache';

	var init = new Promise(function(resolve, reject){

		var request = indexedDB.open('getlibs', 1);

		request.onupgradeneeded = function(){
			request.result.createObjectStore(store);
		};

		request.onsuccess = function(){
			resolve(request.result);
		};

		request.onerror = function(){
			reject(request.error);
		};
	});


	function wrap(callback){
		return init.then(function(db){
			return new Promise(function(resolve, reject){

				var request = callback(db);

				request.transaction.oncomplete = function(){
					resolve(request.result);
				};

				request.transaction.onerror = function() {
					reject(request.error);
				};
			});
		});
	}


	function getItem(key){
		return wrap(function(db){
			return db.transaction(store).objectStore(store).get(key);
		});
	}


	function setItem(key, value){
		return wrap(function(db){
			return db.transaction(store, 'readwrite').objectStore(store).put(value, key);
		});
	}

	return {
		'get': getItem,
		'set': setItem
	};
});
