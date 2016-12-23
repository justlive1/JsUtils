/**
 * 
 */
function ListMultimap() {

	var map = new HashMap();

	var totalSize = 0;

	this.size = function() {
		return totalSize;
	};

	this.isEmpty = function() {
		return this.size() == 0;
	};

	this.containsKey = function(key) {
		return map.containsKey(key);
	};

	this.containsValue = function(value) {
		var values = map.values();
		for ( var v in values) {
			if (values[v].indexOf(value) > -1) {
				return true;
			}
		}
		return false;
	};

	this.containsEntry = function(key, value) {
		if (this.containsKey(key)) {
			var collection = this.get(key);
			return collection.indexOf(value) > -1;
		}
		return false;
	};

	this.put = function(key, value) {
		var collection = map.get(key);
		if (collection == null) {
			collection = [ value ];
			totalSize++;
			map.put(key, collection);
			return true;
		} else {
			collection.push(value);
			totalSize++;
			return true;
		}
		return false;
	};

	this.remove = function(key, value) {
		var collection = map.get(key);
		if (collection != null) {
			var index = collection.indexOf(value);
			if (index > -1) {
				var ele = collection.splice(index, 1);
				--totalSize;
				return ele;
			}
		}
	};

	this.putAll = function(key, values) {
		var collection = map.get(key);
		if (collection == null) {
			map.put(key, values);
		} else {
			collection = conllection.concat(values);
		}
		totalSize += values.length;
	};

	this.removeAll = function(key) {
		var collection = map.get(key);
		if(collection != null){
			map.remove(key);
			totalSize -= collection.length;
			return collection;
		}
	};

	this.clear = function() {
		for ( var collection in map.values()) {
			collection.length = 0;
		}
		map.clear();
		totalSize = 0;
	};

	this.get = function(key) {
		var collection = map.get(key);
		if (collection == null) {
			// TODO
		}
		return collection;
	};

	this.keys = function() {
		return map.keys();
	};

	this.values = function() {
		var values = new Array();;
		var collections = map.values()
		for ( var i in collections) {
			values = values.concat(collections[i]);
		}
		return values;
	};

}