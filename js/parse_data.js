$(document).ready(function() {
    csgo.parsed_data = parse_json(csgo.players, csgo.price);
    witcher3.parsed_data = parse_json(witcher3.players, witcher3.price);
    asseto.parsed_data = parse_json(asseto.players, asseto.price);
    banner.parsed_data = parse_json(banner.players, banner.price);
    gta.parsed_data = parse_json(gta.players, gta.price);
    pcars.parsed_data = parse_json(pcars.players, pcars.price);

    //Debug only, to be executed by DOM events
	//line_chart_players(csgo.parsed_data,'blue', witcher3.parse_data, 'yellow');
	//line_chart_players();
    //line_chart_price(csgo.parsed_data,'red', witcher3.parse_data, 'black');
	//map_chart(/*csgo.details,*/witcher3.details);
    //line_chart_(csgo.parsed_data,'blue', witcher3.parse_data, 'yellow');
    //line_chart_price(csgo.parsed_data,'red', witcher3.parse_data, 'black');
   // map_chart(csgo.details,witcher3.details)
});

function parse_json(input_historic, input_price) {
    var player_historic_filtered = {
        data: []
    };
    _.each(input_historic.players, function(e, i) {
        if (e != null ) {
            player_historic_filtered.data.push({
                date: moment((input_historic.start + input_historic.step * i) * 1000).format("DD-MM-YY"),
                players: e
            });
        }
    }, player_historic_filtered);
    var currentPrice = input_price.data.initial[0][1]
    player_historic_filtered.data[0].price = currentPrice
    for (var j = 1; j < player_historic_filtered.data.length; j++) {
        var date = player_historic_filtered.data[j].date;
        for (var i = 0; i < input_price.data.final.length; i++) {
            if (moment(input_price.data.final[i][0]).format("DD-MM-YY") == date) {
                currentPrice = input_price.data.final[i][1]
            }
            player_historic_filtered.data[j].price = currentPrice
        }
    }
    return player_historic_filtered;
}

function parseDate(input) {
    var parts = input.split("-");
    return new Date(20 + parts[2],parts[1] - 1,parts[0]);
}

function normalizePrice(data) {
    for (var i = 0; i < data.data.length; i++) {}
}

