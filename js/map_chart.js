var parsedCountryData = [];

function map_chart(){
	parsedCountryData = [];
	d3.select('#map').selectAll('*').remove();
  if (arguments.length > 0){
      for (var i = 0; i < arguments.length ; i++){
      	console.log(arguments[i].data.country[0])
	  	parsedCountryData.push({1800:"1", Country:arguments[i].data.country[1], Game: arguments[i].data.name});
      }
  }
   var map = d3.geomap.choropleth()
                  .geofile('lib/d3-geomap/topojson/world/countries.json')
                  .colors(['green','#7D26CD'])
                  .column('1800')
                  .domain([0, 1])
                  .legend(false)
                  .unitId('Country')
                  .zoomFactor(6)
                  .unitTitle(function(d){
                  	var toReturn = "";
                  	toReturn += d.properties.name + "\n"
                  	for (var i = 0; i < parsedCountryData.length;i++){
                  		if(d.id == parsedCountryData[i].Country)
							toReturn += parsedCountryData[i].Game + "\n"
                  	}
                  	return toReturn
                  }) ;
    	          
   		d3.select('#map')
            .datum(parsedCountryData)
    		.call(map.draw, map);
}
