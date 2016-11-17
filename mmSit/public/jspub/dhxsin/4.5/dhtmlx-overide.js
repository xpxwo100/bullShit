/**
 * 重写dthmlx，将必填项*号放到label前面
 */
dhtmlXForm.prototype.items.input.doAddLabel = function(b, c) {
			var a = document.createElement("DIV");
			a.className = "dhxform_label " + c.labelAlign;
			a.innerHTML = "<label for='"
					+ c.uid
					+ "'>"
					+ (b._required ? "<span class='dhxform_item_required'>*</span>"
							: "")
					+ c.label
					+ (c.info ? "<span class='dhxform_info'>[?]</span>" : "")
					 + "</label>";
			if (c.wrap == true) {
				a.style.whiteSpace = "normal";
			}
			if (typeof (c.tooltip) != "undefined") {
				a.title = c.tooltip;
			}
			b.appendChild(a);
			if (typeof (c.label) == "undefined" || c.label == null
					|| c.label.length == 0) {
				a.style.display = "none";
			}
			if (!isNaN(c.labelWidth)) {
				a.style.width = parseInt(c.labelWidth) + "px";
			}
			if (!isNaN(c.labelHeight)) {
				a.style.height = parseInt(c.labelHeight) + "px";
			}
			if (!isNaN(c.labelLeft)) {
				a.style.left = parseInt(c.labelLeft) + "px";
			}
			if (!isNaN(c.labelTop)) {
				a.style.top = parseInt(c.labelTop) + "px";
			}
			if (c.info) {
				a.onclick = function(f) {
					f = f || event;
					var d = f.target || f.srcElement;
					if (typeof (d.className) != "undefined"
							&& d.className == "dhxform_info") {
						this.parentNode.callEvent("onInfo", [ this.parentNode._idd,
								f ]);
						f.cancelBubble = true;
						if (f.preventDefault) {
							f.preventDefault();
						} else {
							f.returnValue = false;
						}
						return false;
					}
				};
			}
};

dhtmlXForm.prototype.items.calendar.doAddLabel = dhtmlXForm.prototype.items.input.doAddLabel;
dhtmlXForm.prototype.items.combo.doAddLabel = dhtmlXForm.prototype.items.input.doAddLabel;