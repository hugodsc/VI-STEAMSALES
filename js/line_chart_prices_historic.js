function line_chart_price() {
    var elm = "#visualisation_price";
    d3.select(elm).selectAll('*').remove();
    if(arguments.length == 0) return;
    var vis = d3.select(elm)
      , WIDTH = $(elm).width()
      , HEIGHT = $(elm).height() -10
      , MARGINS = {
        top: 20,
        right: 10,
        bottom: 20,
        left: 20
    }
    
    var maxPrice = arguments[0].data[0].price
      , maxDate = parseDate(arguments[0].data[0].date)
      , minDate = parseDate(arguments[0].data[0].date)
      , minPrice = arguments[0].data[0].price

    for (var argsCounter = 0; argsCounter < arguments.length ; argsCounter++){
        for (var i = 0; i < arguments[argsCounter].data.length; i++) {
                if (arguments[argsCounter].data[i].price > maxPrice) {
                    maxPrice = arguments[argsCounter].data[i].price
                }
                var tempDate = parseDate(arguments[argsCounter].data[i].date)
                if (tempDate > maxDate) {
                    maxDate = tempDate
                }
                if (arguments[argsCounter].data[i].price < minPrice) {
                    minPrice = arguments[argsCounter].data[i].price
                }
                if (tempDate < minDate) {
                    minDate = tempDate
                }
            }
        argsCounter++
    }
    
   
    xScale = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([minDate, maxDate])
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([minPrice, maxPrice])
    xAxis = d3.svg.axis().scale(xScale),
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    vis.append("svg:g").attr("class", "axis").attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")").call(xAxis);
    vis.append("svg:g").attr("class", "axis").attr("transform", "translate(" + (MARGINS.left) + ",0)").call(yAxis);
    var lineGen = d3.svg.line().x(function(d) {
        return xScale(parseDate(d.date));
    }).y(function(d) {
        return yScale(d.price);
    }).interpolate("basis");

    for (var argsCounter = 0; argsCounter < arguments.length ; argsCounter++){
        vis.append('svg:path').attr('d', lineGen(arguments[argsCounter].data)).attr('stroke', arguments[argsCounter+1]).attr('stroke-width', 2).attr('fill', 'none');
        argsCounter++
    }    
}
