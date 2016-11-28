var parsedCountryData = [];

function map_chart(){
	parsedCountryData = [];
	d3.select('#map').selectAll('*').remove();
  if (arguments.length > 0){
      for (var i = 0; i < arguments.length ; i++){
      	console.log(arguments[i].data.country[0])
	  	parsedCountryData.push({1800:"1", Country:arguments[i].data.country[1]});
      }
  }
   var map = d3.geomap.choropleth()
                  .geofile('lib/d3-geomap/topojson/world/countries.json')
                  .colors(['green','red'])
                  .column('1800')
                  .domain([0, 1])
                  .legend(false)
                  .unitId('Country');
   d3.select('#map')
        .datum(parsedCountryData)
        .call(map.draw, map);
}
