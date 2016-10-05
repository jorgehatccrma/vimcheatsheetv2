/* jslint esversion: 6 */

const data = {"moves": [{"keys": "k", "arg": null, "desc": "up", "pos": [0, -1], "level": 0}, {"keys": "{", "arg": null, "desc": "paragraph", "pos": [0, -2], "level": 0}, {"keys": "(", "arg": null, "desc": "sentence", "pos": [1, -2], "level": 1}, {"keys": "H", "arg": null, "desc": "screen", "pos": [0, -3], "level": 0}, {"keys": "C-b", "arg": null, "desc": "page", "pos": [0, -4], "level": 0}, {"keys": "C-u", "arg": null, "desc": "1/2 page", "pos": [1, -4], "level": 1}, {"keys": "?", "arg": "text", "desc": "find {arg}", "pos": [0, -5], "level": 0}, {"keys": "N", "arg": null, "desc": "next {arg}", "pos": [1, -5], "level": 1}, {"keys": "n", "arg": null, "desc": "previous {arg}", "pos": [-1, -5], "level": 1}, {"keys": "#", "arg": null, "desc": "find word under cursor", "pos": [-2, -5], "level": 1}, {"keys": "gg", "arg": null, "desc": "first line", "pos": [0, -6], "level": 0}, {"keys": "j", "arg": null, "desc": "down", "pos": [0, 1], "level": 0}, {"keys": "}", "arg": null, "desc": "paragraph", "pos": [0, 2], "level": 0}, {"keys": ")", "arg": null, "desc": "sentence", "pos": [-1, 2], "level": 1}, {"keys": "L", "arg": null, "desc": "screen", "pos": [0, 3], "level": 0}, {"keys": "C-f", "arg": null, "desc": "page", "pos": [0, 4], "level": 0}, {"keys": "C-d", "arg": null, "desc": "1/2 page", "pos": [-1, 4], "level": 1}, {"keys": "/", "arg": "text", "desc": "find {arg}", "pos": [0, 5], "level": 0}, {"keys": "N", "arg": null, "desc": "previous {arg}", "pos": [-1, 5], "level": 1}, {"keys": "n", "arg": null, "desc": "next {arg}", "pos": [1, 5], "level": 1}, {"keys": "*", "arg": null, "desc": "find word under cursor", "pos": [2, 5], "level": 1}, {"keys": "G", "arg": null, "desc": "last line", "pos": [0, 6], "level": 0}, {"keys": "l", "arg": null, "desc": "right", "pos": [1, 0], "level": 0}, {"keys": "e", "arg": null, "desc": "end", "pos": [2, 0], "level": 0}, {"keys": "E", "arg": null, "desc": "delimited end", "pos": [2, 1], "level": 1}, {"keys": "w", "arg": null, "desc": "word", "pos": [3, 0], "level": 0}, {"keys": "W", "arg": null, "desc": "delimited word", "pos": [3, 1], "level": 1}, {"keys": "t", "arg": "x", "desc": "before {arg}", "pos": [4, 0], "level": 0}, {"keys": "f", "arg": "x", "desc": "find {arg}", "pos": [5, 0], "level": 0}, {"keys": ",", "arg": null, "desc": "previous {arg}", "pos": [5, -1], "level": 1}, {"keys": ";", "arg": null, "desc": "next {arg}", "pos": [5, 1], "level": 1}, {"keys": "$", "arg": null, "desc": "end of line", "pos": [6, 0], "level": 0}, {"keys": "h", "arg": null, "desc": "left", "pos": [-1, 0], "level": 0}, {"keys": "ge", "arg": null, "desc": "end", "pos": [-2, 0], "level": 0}, {"keys": "gE", "arg": null, "desc": "delimited end", "pos": [-2, -1], "level": 1}, {"keys": "b", "arg": null, "desc": "word", "pos": [-3, 0], "level": 0}, {"keys": "B", "arg": null, "desc": "delimited word", "pos": [-3, -1], "level": 1}, {"keys": "T", "arg": "x", "desc": "after {arg}", "pos": [-4, 0], "level": 0}, {"keys": "F", "arg": "x", "desc": "find {arg}", "pos": [-5, 0], "level": 0}, {"keys": ",", "arg": null, "desc": "next {arg}", "pos": [-5, 1], "level": 1}, {"keys": ";", "arg": null, "desc": "previous {arg}", "pos": [-5, -1], "level": 1}, {"keys": "^", "arg": null, "desc": "first non-blank", "pos": [-6, 0], "level": 0}, {"keys": "0", "arg": null, "desc": "start of line", "pos": [-7, 0], "level": 0}], "abs_moves": [{"keys": "''", "arg": null, "desc": "last location", "pos": [0, 0], "level": 0}, {"keys": "'.", "arg": null, "desc": "last edit", "pos": [1, 0], "level": 0}, {"keys": "#G", "arg": null, "desc": "line #", "pos": [2, 0], "level": 0}, {"keys": "%", "arg": null, "desc": "matching bracket", "pos": [3, 0], "level": 0}]};

var Padding = function(v) {
	var me = {top: 20, right: 20, bottom: 20, left: 20};
	// TODO: add other possible "constructors" (one argument, 4 arguments, dict)
	if (arguments.length == 1) {
		if (Number.isFinite(v)) {
			me.top = me.right = me.bottom = me.left = v;
		} else {
			me = v;
		}
	}
	else if (arguments.length == 4) {
			me.top = v[0];
			me.right = v[1];
			me.bottom = v[2];
			me.left = v[3];
	}
	
	me.horizontal = function horizontal() {
		return me.left + me.right; 
	};

	me.vertical = function vertical() {
		return me.left + me.right; 
	};

	return me;
};

const displayMoves = function() {

	const cell_w = 80,
				cell_h = 52,
				padding = Padding(45);


	// for layout calculations
	var minx=0, maxx=0, miny=0, maxy=0;

	data.moves.forEach(function(d) {
		minx = Math.min(minx, d.pos[0]);
		maxx = Math.max(maxx, d.pos[0]);
		miny = Math.min(miny, d.pos[1]);
		maxy = Math.max(maxy, d.pos[1]);
	});

	const W = cell_w*(maxx-minx+1) + padding.horizontal(),
				H = cell_h*(maxy-miny+1) + padding.vertical(),
				left_edge = (-minx+0.5)*cell_w,
				right_edge = (maxx+0.5)*cell_w,
				top_edge = (-miny+0.5)*cell_h,
				bottom_edge = (maxy+0.5)*cell_h;

	let svg = d3.select("div.main").append("svg:svg").attr("id", "canvas").attr("width", W).attr("height", H);
	let main_g = svg.append("g").attr("transform", "translate(" + (left_edge + padding.left) + "," + (top_edge + padding.top) + ")");
	let absolute_g = svg.append("g").attr("transform", "translate(80, " + 4*H/5 + ")");

	const create_nodes = function(nodes) {
		nodes.enter()
				.append("g")
				.classed("node", true)
				.classed("secondary", function(d){ return d.level > 0;})
				.each(function(d, i) {
					let key_text = d3.select(this).append("text");
					key_text.append("tspan").classed("keys", true).attr("x", 0);
					key_text.append("tspan").classed("args", true);

					let desc_text = d3.select(this).append("text").classed("desc", true);
					// desc_text.append("tspan").classed("desc", true).attr("x", 0).attr("dy", 20);
				});

		nodes.exit()
				.remove();

		nodes.attr("transform", function(d, i) {
					return "translate(" + cell_w * d.pos[0] + "," + cell_h * d.pos[1] + ")";
				})
				.each(function(d, i) {
					d3.select(this).select(".keys").text(d.keys);
					d3.select(this).select(".args").text(d.arg || "");
					// d3.select(this).select(".desc").text(d.desc);
					d3.select(this).select("text.desc").text(d.desc).attr("y", 10).attr("dy", "0.6em").call(wrap, cell_w-10);
				});
	};

	let nodes = main_g.selectAll("g.node").data(data.moves).call(create_nodes);
	let abs_nodes = absolute_g.selectAll("g.node").data(data.abs_moves).call(create_nodes);


	/**
	 *  Wrap lines of text (using as many tspan objects as necessary), given a max width.
	 *
	 *  Adapted from: https://bl.ocks.org/mbostock/7555321
	 *
	 *  Note:
	 *		The caller <text> element must have its dy attribute defined
	 **/
	function wrap(text, width) {
		text.each(function() {
			var text = d3.select(this),
					words = text.text().split(/\s+/).reverse(),
					word,
					line = [],
					lineNumber = 0,
					lineHeight = 1.0, // ems
					y = text.attr("y"),
					dy = parseFloat(text.attr("dy")),
					tspan = text.text(null).append("tspan").classed("desc", true).attr("x", 0).attr("y", y).attr("dy", dy + "em");
			while (word = words.pop()) {
				line.push(word);
				tspan.text(line.join(" "));
				if (tspan.node().getComputedTextLength() > width) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];
					tspan = text.append("tspan").classed("desc", true).attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
				}
			}
		});
	}


	const bg_label = function() {
		return BGText()
							.bg_class("bg")
							.text_class("bg-text")
							.padding({top: 1, right: 8, bottom: 1, left: 8});
	};

	const main_labels = [{text: "left", transform: "translate(" + (-left_edge-10) + ",0) rotate(-90)"},
						     		   {text: "right", transform: "translate(" + (right_edge+10) + ",0) rotate(90)"},
								       {text: "up", transform: "translate(0, " + (-top_edge-10) + ")"},
											 {text: "down", transform: "translate(0, " + (bottom_edge+25) + ")"}];

	let mlabs = main_g.selectAll("g.main_axis").data(main_labels);
	mlabs.enter().append("g").classed("main_axis", true);
	mlabs.attr("transform", function(d) { return d.transform; })
	    .call(bg_label());


	const abs_labels = [{text: "absolute movements", transform: "translate(" + (data.abs_moves.length-1)*cell_w/2 + ", " + (-cell_h) + ")"}];

	let alabs = absolute_g.selectAll("g.main_axis").data(abs_labels);
	alabs.enter().append("g").classed("main_axis", true);
	alabs.attr("transform", function(d) { return d.transform; })
	     .call(bg_label());
};
