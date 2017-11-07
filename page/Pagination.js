(function() {

	var root = this;

	var Pagination = function(dom, conf) {

		var _this = this;
		var _dom = dom,
			total = (conf == null || conf.total == null) ? 0 : conf.total,
			current = (conf == null || conf.current == null) ? 1 : conf.current,
			hasPageIndex = (conf == null || conf.hasPageIndex == null) ? true : conf.hasPageIndex,
			pageSize = (conf == null || conf.pageSize == null) ? 10 : conf.pageSize,
			ellipsis = (conf == null || conf.ellipsis == null) ? '…' : conf.ellipsis,
			callback = (conf == null || conf.callback == null) ? null : conf.callback;

		var pageCount, pages;

		function calcPages() {
			pageCount = Math.ceil(total / pageSize);
			pages = [];
			if(pageCount < 2) {
				return;
			}
			if(current < 1) {
				current = 1;
			}
			if(current > pageCount) {
				current = pageCount;
			}
			if(pageCount > 11) {
				var len = pageCount - current;
				if(current > 6 && len > 5) {
					pages = [1, 2, ellipsis, current - 2, current - 1, current, current + 1, current + 2, ellipsis, pageCount - 1, pageCount];
				} else if(current > 6 && len <= 5) {
					pages = [1, 2, ellipsis];
					for(var i = 7; i >= 0; i--) {
						pages.push(pageCount - i);
					}
				} else if(current <= 6 && len > 5) {
					for(var i = 1; i <= 8; i++) {
						pages.push(i);
					}
					pages = pages.concat([ellipsis, pageCount - 1, pageCount]);
				}
			} else {
				for(var i = 1; i <= pageCount; i++) {
					pages.push(i);
				}
			}
		}

		function bindEvent() {

			var _btn_idxs = document.getElementsByClassName('pageidx');
			for(var i = 0; i < _btn_idxs.length; i++) {
				if(!_btn_idxs[i].className.endsWith(" disabled")){
					_btn_idxs[i].onclick = function(e) {
						var p = this.getAttribute("data-page");
						if(p != null) {
							current = p;
							render();
							if(callback) {
								callback(p, _this);
							}
						}
					};
				}
			}
		}

		function render() {
			calcPages();
			var html = '<div class="pagination">'
			if(pages.length) {
				html += '<ul class="pagination-list"><li data-page="' + (current - 1) + '" class="pageidx ' + (current == 1 ? "disabled" : "") + '" >上一页</li>';
				for(var i = 0, j = pages.length; i < j; i++) {
					if(pages[i] == ellipsis) {
						html += '<li class="ellipsis">' + ellipsis + '</li>'
					} else {
						html += '<li data-page="' + pages[i] + '" class="pageidx ' + (current == pages[i] ? "active" : "") + '">' + pages[i] + '</li>'
					}
				}
				html += '<li data-page="' + (current - -1) + '" class="pageidx ' + (current == pageCount ? "disabled" : "") + '">下一页</li></ul>';
			}
			html += '<div class="pagination-total">总计' + total + '条</div></div>';

			_dom.innerHTML = html;

			bindEvent();
		}

		if(total > 0) {
			render();
		}

		this.setTotal = function(t) {
			total = t;
			render();
		};

	}

	if(typeof exports !== 'undefined') {
		if(typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Pagination;
		}
		exports.Pagination = Pagination;
	} else if(typeof define === 'function' && define.amd) {
		define('Pagination', function() {
			return Pagination;
		});
	} else {
		root['Pagination'] = Pagination;
	}

}).call(this);