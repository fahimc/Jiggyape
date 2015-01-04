(function ($) {

	$.fn.syncData = function (data, fromDom) {
		if (data == null) return this;

		var members = this.find("[member]");
		if (members == null || members.length == 0) return this;

		members.each(function (index, item) {
			var member = $(item);
			var memberName = member.member();
			if (memberName in data) {
				if (fromDom) {
					data[memberName] = member.valExt();
				} else {
					member.valExt(data[memberName]);
				}
			}
		});
		return this;
	}

	$.fn.member = function () {
		return this.attr("member");
	}

	$.fn.valExt = function (value, mode) {
		if (this.is("select") && this.attr("data-role") == "select-tree") {
			var tree = this.next(".select-tree");
			if (tree) {
				if (value == null) {
					if (mode == "dict") {
						var values = {};
						$(".checkbox", tree).each(function (index, item) {
							var jItem = $(item);
							values[jItem.val()] = jItem.valExt();
						});
						return values;
					} else {
						var values = [];
						$(".checkbox:checked", tree).each(function (index, item) {
							values.push($(item).val());
						});
						return values;
					}
				} else {
					return this;
				}
			}
		}
		// If value is present it means we're setting the value in the dom
		var type = this.attr("type");
		if (type == "checkbox") {
			if (value == null) {
				return this.prop("checked");
			} else {
				return this.prop("checked", !!value);
			}
		}
		if (this.is("span")) {
			if (value == null) {
				return this.text();
			}
			else {
				return this.text(value);
			}
		}
		if (value == null) {
			return this.val();
		} else {
			return this.val(value);
		}
	}
})(jQuery);