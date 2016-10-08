
/* jslint esversion: 6 */

const data = {
	verbs: [
		{char: "v", desc: "visual"},
		{char: "d", desc: "delete (cut)"},
		{char: "y", desc: "yank (copy)"},
		{char: "c", desc: "change"}
	],
	modifiers: [
		{char: "i", desc: "inside"},
		{char: "a", desc: "around"},
		{char: "t", desc: "till (finds a character)"},
		{char: "f", desc: "find (like till, but it includes the character)"}
	],
	nouns: [
		{char: "w", desc: "word"},
		{char: "s", desc: "sentence"},
		{char: "p", desc: "paragraph"},
		{char: "b", desc: "block (parentheses)"},
		{char: "t", desc: "tag (e.g. <div>)"}
	],
	examples: [
		{cmd: "dw", desc: "delete word", fulldesc: "from the cursor's location till the end of the word"},
		{cmd: "diw", desc: "delete inside word", fulldesc: "the whole word, regardless of where in the word the cursor is"},
		{cmd: "ciw", desc: "change inside word", fulldesc: "delete the current word and enter insert mode immediately"},
		{cmd: "vas", desc: "visual around sentence", fulldesc: "visually select the whole sentence"},
		{cmd: "yf)", desc: "yank till )", fulldesc: "copy fomr the cursor's position until the first occurrence of ')'"}
	]
};

const displayCommands = function(container) {

  /**
	 * container is a d3 selection of the container element
	 **/

	let main_table = container.append("table").classed("main-table", true);
	let header = main_table.append("tr"),
			body = main_table.append("tr");

	header.append("th").html("verbs");
	header.append("th").html("modifiers");
	header.append("th").html("nouns");

	let verbs = body.append("td").append("ul").selectAll("li").data(data.verbs),
			modifiers = body.append("td").append("ul").selectAll("li").data(data.modifiers),
			nouns = body.append("td").append("ul").selectAll("li").data(data.nouns);

	[verbs, modifiers, nouns].forEach(function(sel) {
		let li = sel.enter()
								.append("li");
		li.append("code").text(function(d,i) { return d.char; });
		li.append("span").text(function(d,i) { return d.desc; });
	});

	container.append("h2").html("Examples");

	let t2 = container.append("table")
										.classed("examples", true)
										.classed("pure-table", true)
										.classed("pure-table-striped", true);

	let examples = t2.selectAll("tr").data(data.examples);
	examples.enter()
					.append("tr")
					.each(function(d,i) {
						var s = d3.select(this);
						s.append("th").text(d.cmd);
						s.append("td").text(d.desc);
						s.append("td").text(d.fulldesc);
					});
};
