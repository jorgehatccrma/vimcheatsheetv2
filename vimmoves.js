/* jslint esversion: 6 */

const data = {"moves": [{"keys": "k", "arg": null, "desc": "up", "pos": [0, -1], "level": 0}, {"keys": "{", "arg": null, "desc": "paragraph", "pos": [0, -2], "level": 0}, {"keys": "(", "arg": null, "desc": "sentence", "pos": [1, -2], "level": 1}, {"keys": "H", "arg": null, "desc": "screen", "pos": [0, -3], "level": 0}, {"keys": "C-b", "arg": null, "desc": "page", "pos": [0, -4], "level": 0}, {"keys": "C-u", "arg": null, "desc": "1/2 page", "pos": [1, -4], "level": 1}, {"keys": "?", "arg": "text", "desc": "find {arg}", "pos": [0, -5], "level": 0}, {"keys": "N", "arg": null, "desc": "next {arg}", "pos": [1, -5], "level": 1}, {"keys": "n", "arg": null, "desc": "previous {arg}", "pos": [-1, -5], "level": 1}, {"keys": "#", "arg": null, "desc": "find word under cursor", "pos": [-2, -5], "level": 1}, {"keys": "gg", "arg": null, "desc": "first line", "pos": [0, -6], "level": 0}, {"keys": "j", "arg": null, "desc": "down", "pos": [0, 1], "level": 0}, {"keys": "}", "arg": null, "desc": "paragraph", "pos": [0, 2], "level": 0}, {"keys": ")", "arg": null, "desc": "sentence", "pos": [-1, 2], "level": 1}, {"keys": "L", "arg": null, "desc": "screen", "pos": [0, 3], "level": 0}, {"keys": "C-f", "arg": null, "desc": "page", "pos": [0, 4], "level": 0}, {"keys": "C-d", "arg": null, "desc": "1/2 page", "pos": [-1, 4], "level": 1}, {"keys": "/", "arg": "text", "desc": "find {arg}", "pos": [0, 5], "level": 0}, {"keys": "N", "arg": null, "desc": "previous {arg}", "pos": [-1, 5], "level": 1}, {"keys": "n", "arg": null, "desc": "next {arg}", "pos": [1, 5], "level": 1}, {"keys": "*", "arg": null, "desc": "find word under cursor", "pos": [2, 5], "level": 1}, {"keys": "G", "arg": null, "desc": "last line", "pos": [0, 6], "level": 0}, {"keys": "l", "arg": null, "desc": "right", "pos": [1, 0], "level": 0}, {"keys": "e", "arg": null, "desc": "end", "pos": [2, 0], "level": 0}, {"keys": "E", "arg": null, "desc": "delimited end", "pos": [2, 1], "level": 1}, {"keys": "w", "arg": null, "desc": "word", "pos": [3, 0], "level": 0}, {"keys": "W", "arg": null, "desc": "delimited word", "pos": [3, 1], "level": 1}, {"keys": "t", "arg": "x", "desc": "before {arg}", "pos": [4, 0], "level": 0}, {"keys": "f", "arg": "x", "desc": "find {arg}", "pos": [5, 0], "level": 0}, {"keys": ",", "arg": null, "desc": "previous {arg}", "pos": [5, -1], "level": 1}, {"keys": ";", "arg": null, "desc": "next {arg}", "pos": [5, 1], "level": 1}, {"keys": "$", "arg": null, "desc": "end of line", "pos": [6, 0], "level": 0}, {"keys": "h", "arg": null, "desc": "left", "pos": [-1, 0], "level": 0}, {"keys": "ge", "arg": null, "desc": "end", "pos": [-2, 0], "level": 0}, {"keys": "gE", "arg": null, "desc": "delimited end", "pos": [-2, -1], "level": 1}, {"keys": "b", "arg": null, "desc": "word", "pos": [-3, 0], "level": 0}, {"keys": "B", "arg": null, "desc": "delimited word", "pos": [-3, -1], "level": 1}, {"keys": "T", "arg": "x", "desc": "after {arg}", "pos": [-4, 0], "level": 0}, {"keys": "F", "arg": "x", "desc": "find {arg}", "pos": [-5, 0], "level": 0}, {"keys": ",", "arg": null, "desc": "next {arg}", "pos": [-5, 1], "level": 1}, {"keys": ";", "arg": null, "desc": "previous {arg}", "pos": [-5, -1], "level": 1}, {"keys": "^", "arg": null, "desc": "first none-blank", "pos": [-6, 0], "level": 0}, {"keys": "0", "arg": null, "desc": "start of line", "pos": [-7, 0], "level": 0}], "abs_moves": []};


const displayMoves = function() {

	const W = 1400,
				H = 780,
				cell_w = 80,
				cell_h = 56;

	let svg = d3.select("div.main").append("svg:svg").attr("width", W).attr("height", H)
							.append("g").attr("transform", "translate(" + W/2 + "," + H/2 + ")");

	let nodes = svg.selectAll("text.node").data(data.moves);

	nodes.enter()
			.append("g")
			.classed("node", true)
			.classed("secondary", function(d){ return !d.level==0;})
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
				d3.select(this).select("text.desc").text(d.desc).attr("y", 10).attr("dy", "0.6em").call(wrap, cell_w);
			});


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


};
