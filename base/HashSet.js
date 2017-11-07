(function() {

	var root = this;
	
	var HashMap = require('./HashMap');

	var HashSet = function() {

		var obj = new Object();
		var map = new HashMap();

		this.size = function() {
			return map.size();
		};

		this.isEmpty = function() {
			return map.isEmpty();
		};

		this.contains = function(val) {
			return map.containsKey(val);
		};

		this.add = function(val) {
			return map.put(val, obj);
		};

		this.remove = function(val) {
			return map.remove(val) == obj;
		};

		this.clear = function() {
			map.clear();
		};

		this.iterator = function() {
			return map.keys();
		};

	}

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = HashSet;
		}
		exports.HashSet = HashSet;
	} else if (typeof define === 'function' && define.amd) {
		define('HashSet', function() {
			return HashSet;
		});
	} else {
		root['HashSet'] = HashSet;
	}

}).call(this);