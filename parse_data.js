$(document).ready(function() {
    var csgo = parse_json(player_historic_CSGO, price_historic_CSGO);
    var witcher = parse_json(player_historic_TheWitcher3, price_historic_TheWitcher3);
});

function parse_json(input_historic, input_price) {
    var player_historic_filtered = {
        data: []
    };

    _.each(input_historic.players, function(e, i) {
        if (e != null) {
            player_historic_filtered.data.push({
                date: moment((input_historic.start + input_historic.step * i) * 1000).format("DD-MM-YY"),
                players: e
            });
        }
    }, player_historic_filtered);
    _.each(input_price.data.final, function(e) {
        e[0] = moment(e[0]).format("DD-MM-YY");
        var elm =
            _.find(player_historic_filtered.data,
                function(num, i) {
                    if (e[0] == num.date) {
                        num.price = e[1];
                    }
                }
        );

    }, player_historic_filtered);
    return player_historic_filtered;
}