var parsedCountryData = [];
var countryCoordinates=[{"name":"USA","scale": 500, "x": 875, "y":450},
{"name":"GBR","scale": 1381, "x": 270, "y":1430},
{"name":"ITA","scale": 1091, "x": 20, "y":930},
{"name":"POL","scale": 1171, "x": -120, "y":1170},
{"name":"DEU","scale": 1281, "x": 10, "y":1250},
{"name":"FIN","scale": 1281, "x": -210, "y":1540},
{"name":"NDL","scale": 2201, "x": 50, "y":2120},
{"name":"CAN","scale": 451, "x": 790, "y":570},
{"name":"USA","scale": 681, "x": -1130, "y":560},
{"name":"ORIGINAL","scale": 69.2510775862069, "x": 200.828125104, "y":104.59798177083334}]

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
                  });
                  

function map_chart(){
	parsedCountryData = [];
	d3.select('#map').selectAll('*').remove();
  	if (arguments.length > 0){
    	for (var i = 0; i < arguments.length ; i++){
			parsedCountryData.push({1800:"1", Country:arguments[i].data.country[1]/*, Game: arguments[i].data.name*/});
      	}
  	}	 	
   	d3.select('#map')
    	.datum(parsedCountryData)
    	.call(map.draw, map);
    zoomToCountry("ITA")
}

function zoomToCountry(countryCode){
	var scale,x,y;
	parsedCountryData = [];
		for (var i = 0; i<countryCoordinates.length;i++){
			if(countryCode == countryCoordinates[i].name){
				scale = countryCoordinates[i].scale;
				x = countryCoordinates[i].x;
				y = countryCoordinates[i].y;
				parsedCountryData.push({1800:"1", Country:countryCode});
				break;
			}
		}
	d3.select('#map').selectAll('*').remove();
	map.scale(scale)
	map.translate([x,y])
	d3.select('#map')
		.datum(parsedCountryData)
    	.call(map.draw, map);

}
