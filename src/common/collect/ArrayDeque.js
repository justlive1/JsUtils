/**
 * 数组实现的 双端队列
 */
function ArrayDeque() {

	var elements = new Array(8);

	var head = 0, tail = 0;

	function doubleCapacity() {
		var p = head;
		var n = elements.length;
		var r = n - p;
		var newCapacity = n << 1;
		var a = new Array(newCapacity);

		for(var i=0;i<n;i++){
			if(i<p){
				a[r+i]=elements[i];
			}else{
				a[i-p]=elements[i];
			}
		}
		
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

	this.removeFirst = function() {
		var h = head;
		var result = elements[h];
		if (result == null) {
			return null;
		}

		elements[h] = null;
		head = (h + 1) & (elements.length - 1);
		return result;
	};

	this.removeLast = function() {
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
	
}