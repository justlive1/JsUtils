(function() {

	var root = this;

	var ArrayDeque = function() {

		var elements = new Array(8);

		var head = 0, tail = 0;

		function copyElements(ori, orid, dis, disd, length) {
			for (var i = 0; i < length; i++) {
				dis[disd + i] = ori[orid + i];
			}
		}

		function doubleCapacity() {
			var p = head;
			var n = elements.length;
			var r = n - p;
			var newCapacity = n << 1;
			var a = new Array(newCapacity);

			copyElements(elements, p, a, 0, r);
			copyElements(elements, 0, a, r, p);

			elements = a;
			head = 0;
			tail = n;
		}

		this.addFirst = function(e) {
			if (e == null) {
				return false;
			}

			elements[head = (head - 1) & (elements.length - 1)] = e;

			if (head == tail) {
				doubleCapacity();
			}

		};

		this.addLast = function(e) {
			if (e == null)
				return false;
			elements[tail] = e;
			if ((tail = (tail + 1) & (elements.length - 1)) == head) {
				doubleCapacity();
			}
		};

		this.pollFirst = function() {
			var h = head;
			var result = elements[h];
			if (result == null) {
				return null;
			}

			elements[h] = null;
			head = (h + 1) & (elements.length - 1);
			return result;
		};

		this.pollLast = function() {
			var t = (tail - 1) & (elements.length - 1);
			var result = elements[t];
			if (result == null)
				return null;
			elements[t] = null;
			tail = t;
			return result;
		};

		this.getFirst = function() {
			return elements[head];
		};

		this.getLast = function() {
			return elements[(tail - 1) & (elements.length - 1)];
		};

		this.size = function() {
			return (tail - head) & (elements.length - 1);
		};

		this.isEmpty = function() {
			return head == tail;
		};

		this.contains = function(o) {
			if (o == null) {
				return false;
			}
			var mask = elements.length - 1;
			var i = head;
			var x;
			while ((x = elements[i]) != null) {
				// TODO collection
				if (o === x) {
					return true;
				}
				i = (i + 1) & mask;
			}
			return false;
		};

		this.toArray = function() {
			var a = new Array(this.size());
			if (head < tail) {
				copyElements(elements, head, a, 0, this.size());
			} else if (head > tail) {
				var headPortionLen = elements.length - head;
				copyElements(elements, head, a, 0, headPortionLen);
				copyElements(elements, 0, a, headPortionLen, tail);
			}
			return a;
		};

	}

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = ArrayDeque;
		}
		exports.ArrayDeque = ArrayDeque;
	} else if (typeof define === 'function' && define.amd) {
		define('ArrayDeque', function() {
			return ArrayDeque;
		});
	} else {
		root['ArrayDeque'] = ArrayDeque;
	}

}).call(this);
