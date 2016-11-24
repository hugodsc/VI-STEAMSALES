function line_chart(data, data2) {
    var vis = d3.select("#visualisation")
      , WIDTH = 1000
      , HEIGHT = 500
      , MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 100
    }
    var maxPlayers = data.data[0].players
      , maxDate = parseDate(data.data[0].date)
      , minDate = parseDate(data.data[0].date)
      , minPlayers = data.data[0].players
    for (var i = 1; i < data.data.length; i++) {
        if (data.data[i].players > maxPlayers) {
            maxPlayers = data.data[i].players
        }
        var tempDate = parseDate(data.data[i].date)
        if (tempDate > maxDate) {
            maxDate = tempDate
        }
        if (data.data[i].players < minPlayers) {
            minPlayers = data.data[i].players
        }
        if (tempDate < minDate) {
            minDate = tempDate
        }
    }
    for (var i = 1; i < data2.data.length; i++) {
        if (data2.data[i].players > maxPlayers) {
            maxPlayers = data2.data[i].players
        }
        var tempDate = parseDate(data2.data[i].date)
        if (tempDate > maxDate) {
            maxDate = tempDate
        }
        if (data2.data[i].players < minPlayers) {
            minPlayers = data2.data[i].players
        }
        if (tempDate < minDate) {
            minDate = tempDate
        }
    }
    xScale = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([minDate, maxDate])
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([minPlayers, maxPlayers])
    xAxis = d3.svg.axis().scale(xScale),
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    vis.append("svg:g").attr("class", "axis").attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")").call(xAxis);
    vis.append("svg:g").attr("class", "axis").attr("transform", "translate(" + (MARGINS.left) + ",0)").call(yAxis);
    var lineGen = d3.svg.line().x(function(d) {
        return xScale(parseDate(d.date));
    }).y(function(d) {
        return yScale(d.players);
    }).interpolate("basis");
    vis.append('svg:path').attr('d', lineGen(data.data)).attr('stroke', 'green').attr('stroke-width', 2).attr('fill', 'none');
    vis.append('svg:path').attr('d', lineGen(data2.data)).attr('stroke', 'blue').attr('stroke-width', 2).attr('fill', 'none');
}


