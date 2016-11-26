var parsedCountryData = [];


function map_chart(){
  if (arguments.length > 0){
      for (var i = 0; i < arguments.length ; i++){
        parseCountryData(arguments[i])
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
}
