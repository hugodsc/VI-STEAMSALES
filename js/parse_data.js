$(document).ready(function() {
    //asseto.parsed_data = parse_json(asseto.players, asseto.price, asseto.details.data.name);
    //banner.parsed_data = parse_json(banner.players, banner.price, banner.details.data.name);
    ////codbo3.parsed_data = parse_json(codbo3.players, codbo3.price);
    //civ5.parsed_data = parse_json(civ5.players, civ5.price, civ5.details.data.name);
    //colinmcrae.parsed_data = parse_json(colinmcrae.players, colinmcrae.price, colinmcrae.details.data.name);
    //csgo.parsed_data = parse_json(csgo.players, csgo.price, csgo.details.data.name);
    //day1.parsed_data = parse_json(day1.players, day1.price, day1.details.data.name);
    ////dirtRally.parsed_data = parse_json(dirtRally.players, dirtRally.price);
    //drugwars.parsed_data = parse_json(drugwars.players, drugwars.price, drugwars.details.data.name);
    ////fm2016.parsed_data = parse_json(fm2016.players, fm2016.price);
    //godus.parsed_data = parse_json(godus.players, godus.price, godus.details.data.name);
    //gta.parsed_data = parse_json(gta.players, gta.price, gta.details.data.name);
    //infestation.parsed_data = parse_json(infestation.players, infestation.price, infestation.details.data.name);
    //insurgency.parsed_data = parse_json(insurgency.players, insurgency.price, insurgency.details.data.name);
    ////nomansky.parsed_data = parse_json(nomansky.players, nomansky.price);
    ////pes2017.parsed_data = parse_json(pes2017.players, pes2017.price);
    //portal2.parsed_data = parse_json(portal2.players, portal2.price, portal2.details.data.name);
    //pcars.parsed_data = parse_json(pcars.players, pcars.price, pcars.details.data.name);
    //retrocity.parsed_data = parse_json(retrocity.players, retrocity.price, retrocity.details.data.name);
    //rocketleague.parsed_data = parse_json(rocketleague.players, rocketleague.price, rocketleague.details.data.name);
    //saintsrow3.parsed_data = parse_json(saintsrow3.players, saintsrow3.price, saintsrow3.details.data.name);
    //shadowrun.parsed_data = parse_json(shadowrun.players, shadowrun.price, shadowrun.details.data.name);
    //shipsimulator.parsed_data = parse_json(shipsimulator.players, shipsimulator.price, shipsimulator.details.data.name);
    //shogun2.parsed_data = parse_json(shogun2.players, shogun2.price, shogun2.details.data.name);
    //skyrim.parsed_data = parse_json(skyrim.players, skyrim.price, skyrim.details.data.name);
    //skyscraper.parsed_data = parse_json(skyscraper.players, skyscraper.price, skyscraper.details.data.name);
    //speedrunners.parsed_data = parse_json(speedrunners.players, speedrunners.price, speedrunners.details.data.name);
    //swapper.parsed_data = parse_json(swapper.players, swapper.price, swapper.details.data.name);
    //tunnelrats.parsed_data = parse_json(tunnelrats.players, tunnelrats.price, tunnelrats.details.data.name);
    //witcher3.parsed_data = parse_json(witcher3.players, witcher3.price, witcher3.details.data.name);
    //witness.parsed_data = parse_json(witness.players, witness.price, witness.details.data.name);
    
    //Debug only, to be executed by DOM events
    //line_chart_players(csgo.parsed_data,'blue', witcher3.parse_data, 'yellow');
    //line_chart_players();
    //line_chart_price(csgo.parsed_data,'red', witcher3.parse_data, 'black');
    //map_chart(/*csgo.details,*/witcher3.details);
    //line_chart_(csgo.parsed_data,'blue', witcher3.parse_data, 'yellow');
    //line_chart_price(csgo.parsed_data,'red', witcher3.parse_data, 'black');
    // map_chart(csgo.details,witcher3.details)
});
function parse_json(input_historic, input_price, name) {
    var data_parsed = {
        data: []
    };
    _.each(input_historic.players, function(e, i) {
        if (e != null ) {
            data_parsed.data.push({
                date_default : moment((input_historic.start + input_historic.step * i) * 1000).format("YYYYMMDD"),
                date: moment((input_historic.start + input_historic.step * i) * 1000).format("DD-MM-YY"),
                players: e
            });
        }
    }, data_parsed);
    var currentPrice = input_price.data.initial[0][1]
    data_parsed.data[0].price = currentPrice
    for (var j = 1; j < data_parsed.data.length; j++) {
        var date = data_parsed.data[j].date;
        for (var i = 0; i < input_price.data.final.length; i++) {
            if (moment(input_price.data.final[i][0]).format("DD-MM-YY") == date) {
                currentPrice = input_price.data.final[i][1];
            }
            data_parsed.data[j].price = currentPrice;
        }
    }
    return data_parsed;
}
function parseDate(input) {
    var parts = input.split("-");
    return new Date(20 + parts[2],parts[1] - 1,parts[0]);
}

//input index
//function findMaxPlayers(elm) {
//    return _.max(input[elm].parsed_data.data, function(elm){ return elm.players; });
//}