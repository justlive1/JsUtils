(function() {

	var root = this;

	var HashMap = function() {

		/** Map 大小 * */
		var size = 0;
		/** 加载因子 */
		var loadFactor = 0.75;
		/** 初始容量 */
		var threshold = 10;

		var _this = this;

		var modCount = 0;

		var table = new Array(threshold);

		/** 添加对象 */
		this.put = function(key, value) {

			var hashCode = hash(key);
			var index = indexFor(hashCode, table.length);

			for (var e = table[index]; e != null; e = e.next) {
				if (e.hash == hashCode && e.key == key) {
					var oldVal = e.value;
					e.value = value;
					return oldVal;
				}
			}

			this.modCount++;
			addEntry(hashCode, key, value, index);
			return null;
		};

		/** 获取对象 */
		this.get = function(key) {
			if (key == undefined) {
				return null;
			}
			var entry = getEntry(key);
			return entry == null ? null : entry.value;
		};

		/** 是否包含key */
		this.containsKey = function(key) {
			return null != getEntry(key);
		};

		/** 是否包含value */
		this.containsValue = function(value) {
			for (var i = 0; i < table.length; i++) {
				for (var e = table[i]; e != null; e = e.next) {
					if (e.value == value) {
						return true;
					}
				}
			}
			return false;
		};

		/** 是否为空 */
		this.isEmpty = function() {
			return size == 0;
		};

		/** 删除key值 */
		this.remove = function(key) {
			if (key == undefined || size == 0) {
				return null;
			}
			var hashCode = hash(key);
			var index = indexFor(hashCode, table.length);
			var pre = table[index];
			var e = pre;
			while (e != null) {
				var next = e.next;
				if (e.hash == hashCode && e.key == key) {
					this.modCount++;
					if (pre == e) {
						table[index] = next;
					} else {
						pre.next = next;
					}
					size--;
					return e.value;
				}
				pre = e;
				e = e.next;
			}
			return e.value;
		};

		/** 清空数据 */
		this.clear = function() {
			this.modCount++;
			for (var i = 0; i < table.length; i++) {
				table[i] = null;
			}
			size = 0;
		};

		/** 获取keys */
		this.keys = function() {
			var keys = new Array();
			for (var i = 0; i < table.length; i++) {
				for (var e = table[i]; e != null; e = e.next) {
					keys.push(e.key);
				}
			}
			return keys;
		};

		this.values = function() {
			var values = new Array();
			for (var i = 0; i < table.length; i++) {
				for (var e = table[i]; e != null; e = e.next) {
					values.push(e.value);
				}
			}
			return values;
		}

		/** 序列化成字符串 */
		this.serializeToString = function(sep) {
			if (this.isEmpty()) {
				return null;
			}
			if (sep == undefined) {
				sep = "&";
			}
			var keys = this.keys();
			var str = "";
			for ( var i in keys) {
				var key = keys[i];
				var value = this.get(key);
				if (isArray(value)) {
					for (var i = 0; i < value.length; i++) {
						str = str + key + "=" + value[i] + sep;
					}
				} else if (value.toString() == "[object Object]") {
					// object类型暂不支持
				} else {
					str = str + key + "=" + value + sep;
				}
			}
			str = str.substring(0, str.length - 1);
			return str;
		};

		/** 序列化成对象 */
		this.serializeToObject = function() {
			if (this.isEmpty()) {
				return null;
			}
			var keys = this.keys();
			var data = {};
			for ( var i in keys) {
				var key = keys[i];
				data[key] = this.get(key);
			}
			return data;
		};

		function getEntry(key) {
			if (size == 0) {
				return null;
			}

			var hashCode = hash(key);
			var index = indexFor(hashCode, table.length);
			for (var e = table[index]; e != null; e = e.next) {
				if (e.hash == hashCode && e.key == key) {
					return e;
				}
			}
			return null;
		}

		/** 扩展容量 */
		function refresh() {
			var newTable = new Array();
			for (var i = 0; i < threshold; i++) {
				if (typeof table[i] != 'undefined') {
					newTable.push(table[i]);
				}
			}
			threshold = threshold * 2;
			table = new Array(threshold);
			size = 0;
			// 重新hash
			for (i = 0; i < newTable.length; i++) {
				var entry = newTable[i];
				_this.put(entry.key, entry.value);
			}
		}

		/** hash算法 */
		function hash(key) {
			var h = 0, off = 0;
			var length = key.length;
			for (var i = 0; i < length; i++) {
				var temp = key.charCodeAt(off++);
				h = 31 * h + temp;
				if (h > 0x7fffffff || h < 0x80000000) {
					h = h & 0xffffffff;
				}
			}
			h ^= (h >>> 20) ^ (h >>> 12);
			return h ^ (h >>> 7) ^ (h >>> 4);
		}

		/** 经过该函数得到 哈希表 哈希地址 */
		function indexFor(hash, length) {
			return hash & (length - 1);
		}

		function addEntry(hashCode, key, value, index) {
			if (size / threshold > loadFactor) {
				refresh();
				hashCode = hash(key);
				index = indexFor(hashCode, table.length);
			}
			createEntry(hashCode, key, value, index);
		}

		function createEntry(hashCode, key, value, index) {
			var e = table[index];
			table[index] = new Entry(key, value, hashCode, e);
			size++;
		}

		/** 存储单元，维护Key/Value关系 */
		var Entry = function(key, value, hashCode, e) {
			this.key = key;
			this.value = value;
			this.next = e;
			this.hash = hashCode;
		};

		this.size = function() {
			return size;
		};

		function isArray(object) {
			return object && typeof object === 'object'
					&& typeof object.length === 'number'
					&& typeof object.splice === 'function'
					&& !(object.propertyIsEnumerable('length'));
		}
	}

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = HashMap;
		}
		exports.HashMap = HashMap;
	} else if (typeof define === 'function' && define.amd) {
		define('HashMap', function() {
			return HashMap;
		});
	} else {
		root['HashMap'] = HashMap;
	}

}).call(this);
