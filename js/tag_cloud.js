var frequency_list = [{"text":"Indie","size":15,"color":"#c266ba"},{"text":"Racing","size":15,"color":"#0ef247"},{"text":"Simulation","size":15,"color":"#66c2a5"}
,{"text":"Sports","size":15,"color":"#66c2a5"},{"text":"RPG","size":15,"color":"#66c2a5"},{"text":"Strategy","size":15,"color":"#66c2a5"},{"text":"Action","size":15,"color":"#66c2a5"}
,{"text":"Adventure","size":15,"color":"#66c2a5"},{"text":"Early Access","size":15,"color":"#66c2a5"},{"text":"Massively Multiplayer","size":15,"color":"#66c2a5"},{"text":"Casual","size":15,"color":"#66c2a5"}];

var mychart = d3.select("#tag_cloud");

d3.layout.cloud().size([380, 220])
        .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

function draw(words) {
        mychart.append("svg")
                .attr("width", 431)
                .attr("height", 270)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(100,100)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d) {
                	return d.color ;})
                .attr("transform", function(d) {
                      return "translate(" + [d.x+2, d.y+2] + ")";
                })
				.on("click", function(d) {
					alert(d.text);
				})
                .text(function(d) { return d.text; });
    }