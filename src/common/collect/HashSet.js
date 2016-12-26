/**
 * @fileOverview HashSet
 */
function HashSet() {

	"use strict";

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