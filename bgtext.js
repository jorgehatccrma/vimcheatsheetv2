/* jshint esversion: 6 */

var BGText = function() {

	var padding = {top: 2, right: 2, bottom: 2, left: 2},
			accessor = function(d) { return d.text; },
			background_class = "bgtext-bg",
			text_class = "bgtext-text";

	function me(selection) {
		console.log("selection", selection);

		selection.each(function(d, i) {
			let sel = d3.select(this);

			let bg = sel.selectAll("rect").data([d]);
			bg.enter().append("rect").classed(background_class, true);

			let text = sel.selectAll("text").data([d]);
			text.enter().append("text").classed(text_class, true);

			text.text(accessor(d));
			
			let bbox = text.node().getBBox();
			bg.attr("x", bbox.x - padding.left)
				.attr("y", bbox.y - padding.top)
				.attr("width", bbox.width + (padding.left + padding.right))
				.attr("height", bbox.height + (padding.top + padding.bottom));
		});
	}

	me.padding = function(val) {
		if (!arguments.length) return padding;
		padding = val;
		return me;
	};

	me.text = function(val) {
		if (!arguments.length) return accessor;
		accessor = val;
		return me;
	};

	me.bg_class = function(val) {
		if (!arguments.length) return background_class;
		background_class = val;
		return me;
	};

	me.text_class = function(val) {
		if (!arguments.length) return text_class;
		text_class = val;
		return me;
	};
	return me;
};
