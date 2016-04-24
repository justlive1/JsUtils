/**
 * Hashing util
 */
(function(window) {

	var Hashing = {};

	Hashing.C1 = 0xcc9e2d51;
	Hashing.C2 = 0x1b873593;

	Hashing.rotateLeft = function(i, distance) {
		return (i << distance) | (i >>> -distance);
	}

	Hashing.hash = function(key) {
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
	};

	Hashing.smear = function(hashCode) {
		return C2 * rotateLeft(hashCode * C1, 15);
	};

	Hashing.smearedHash = function(o) {
		return smear((o == null) ? 0 : hash(o));
	};

	
})(window);