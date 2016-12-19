var frequency_list = [{"text":"Indie","size":30,"color":"#c266ba"},{"text":"Racing","size":30,"color":"#0ef247"},{"text":"Simulation","size":30,"color":"#66c2a5"}
,{"text":"Sports","size":30,"color":"#66c2a5"},{"text":"RPG","size":30,"color":"#66c2a5"},{"text":"Strategy","size":30,"color":"#66c2a5"},{"text":"Action","size":30,"color":"#66c2a5"}
,{"text":"Adventure","size":30,"color":"#66c2a5"},{"text":"Early Access","size":30,"color":"#66c2a5"},{"text":"Massively Multiplayer","size":30,"color":"#66c2a5"},{"text":"Casual","size":30,"color":"#66c2a5"}];

var mychart = d3.select("#tag_cloud");
var width = mychart[0][0].clientWidth
var height = 270
d3.layout.cloud().size([width, height])
        .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

            d3.select("body")
				.on("keydown", function() {
					updateWords("Strategy",5)
				});
	
function updateWords(genre, sizeToAdd){
	var cloud = mychart.selectAll("g text")
                        .data(frequency_list, function(d) { return d.text; })

	//Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            //.attr('font-size', 1)
            .text(function(d) { return d.text; });
    for (var i = 0; i<frequency_list.length;i++){
    	if(frequency_list[i].text == genre){
    		frequency_list[i].size += sizeToAdd;
    		break;
    	}
    }                    
	cloud.transition().style("font-size", function(d) {
		if(d.text == genre){return d.size+sizeToAdd + "px";}
		else{return d.size+"px";} 
		
	})
}

function draw(words) {
     mychart.append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(" + width/3 + "," +  height/2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d) {
                	return d.color ;})
               .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
				.on("click", function(d) {
					alert(d.text);
				})
                .text(function(d) { return d.text; });
               
    }