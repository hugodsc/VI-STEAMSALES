var frequency_list = [{"text":"Indie","size":30,"color":"#66c2a5"},{"text":"Racing","size":30,"color":"#66c2a5"},{"text":"Simulation","size":30,"color":"#66c2a5"}
,{"text":"Sports","size":30,"color":"#66c2a5"},{"text":"RPG","size":30,"color":"#66c2a5"},{"text":"Strategy","size":30,"color":"#66c2a5"},{"text":"Action","size":30,"color":"#66c2a5"}
,{"text":"Adventure","size":30,"color":"#66c2a5"},{"text":"Early Access","size":30,"color":"#66c2a5"},{"text":"Massively Multiplayer","size":30,"color":"#66c2a5"},{"text":"Casual","size":30,"color":"#66c2a5"}];

var mychart = d3.select("#tag_cloud");
var width = mychart[0][0].clientWidth
var height = 270

d3.layout.cloud().size([width, height])
        	.words(updateWords(frequency_list))
        	.padding(5)
            .rotate(function(d) { return 0; })
	      	.font('monospace')
	      	.spiral("archimedean")
            .text(function(d) { return d.text; }) // THE SOLUTION
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

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
					vm.setFilter(d.text);
				})
                .text(function(d) { return d.text; });
               
    }

function updateWords(list){
	
	for (var i = 0; i < frequency_list.length ; i++){
		frequency_list[i].size = 30;
		frequency_list[i].color = "#66c2a5"		
	}
	
	var genres = []
	var maxPlayers = 0;
	
	_.each(input, function(elm, i) {
		var totalPlayers = 0;
		for(var i = 0; i < elm.parsed_data.data.length; i++){
			totalPlayers += elm.parsed_data.data[i].players
			if(totalPlayers > maxPlayers)
					maxPlayers=totalPlayers;
		}

		for(var i = 0; i < elm.details.data.genres.length ; i++){
			var found = false;
			for(var j = 0 ; j < genres.length ; j++){
				if(genres[j].genre == elm.details.data.genres[i].description){
					genres[j].totalPlayers = (genres[j].totalPlayers + totalPlayers)
					found = true;
					break;
				}
			}
			if(!found){
				genres.push({"genre":elm.details.data.genres[i].description,"totalPlayers":totalPlayers})
			}
		}
	});

    if(genres.length == 0){
		for (var i = 0; i<frequency_list.length;i++){
			frequency_list[i].size = 30;
			frequency_list[i].color = "#66c2a5"
		}
    }
    else{        
		for(var j = 0; j<genres.length;j++){
			for (var i = 0; i<frequency_list.length;i++){
				if(frequency_list[i].text == genres[j].genre){
					sizeToAdd = (genres[j].totalPlayers / maxPlayers) * 15
					frequency_list[i].size += sizeToAdd;
					frequency_list[i].color = "#165dba"
				}		
			}
		}
    }
	return frequency_list;
}