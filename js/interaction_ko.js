var vm = {};
function interactVmImplement() {
    var self = this;
    self.db = ko.observableArray();
    self.selection = ko.observableArray();
    self.selected = ko.observable();
    self.colors = ['red', 'black', 'blue', 'yellow', 'green', 'orange'];
    //Populate db
    self.db.push(asseto);
    self.db.push(banner);
    ////self.db.push(codbo3);
    self.db.push(civ5);
    //self.db.push(colinmcrae);
    self.db.push(csgo);
    self.db.push(day1);
    //self.db.push(dirtRally);
    self.db.push(drugwars);
    //self.db.push(fm2016);
    self.db.push(godus);
    self.db.push(gta);
    self.db.push(infestation);
    self.db.push(insurgency);
    //self.db.push(nomansky);
    //self.db.push(pes2017);
    self.db.push(portal2);
    self.db.push(pcars);
    self.db.push(retrocity);
    self.db.push(rocketleague);
    self.db.push(saintsrow3);
    self.db.push(shadowrun);
    self.db.push(shipsimulator);
    self.db.push(shogun2);
    self.db.push(skyrim);
    self.db.push(skyscraper);
    self.db.push(speedrunners);
    self.db.push(swapper);
    self.db.push(tunnelrats);
    self.db.push(witcher3);
    self.db.push(witness);
    self.db.valueHasMutated();
    //Util
    self.editingId = ko.observable();
    self.getIndex = function(index) {
        return index();
    }
}
;vm = new interactVmImplement();
ko.applyBindings(vm);
window.onload = function() {
    //map_chart();
    
    dragula([document.getElementById('game-db'), document.getElementById('game-selection')], {
        isContainer: function(el) {
            return false;
            // only elements in drake.containers will be taken into account
        },
        moves: function(el, source, handle, sibling) {
            return true;
            // elements are always draggable by default
        },
        accepts: function(el, target, source, sibling) {
            return true;
            // elements can be dropped in any of the `containers` by default
        },
        invalid: function(el, handle) {
            return false;
            // don't prevent any drags from initiating by default
        },
        direction: 'horizontal',
        // Y axis is considered when determining where an element would be dropped
        copy: false,
        // elements are moved by default, not copied
        copySortSource: false,
        // elements in copy-source containers can be reordered
        revertOnSpill: false,
        // spilling will put the element back where it was dragged from, if this is true
        removeOnSpill: false,
        // spilling will `.remove` the element, if this is true
        mirrorContainer: document.body,
        // set the element that gets mirror elements appended
        ignoreInputTextSelection: true // allows users to select input text, see details below
    }).on('drag', function(el, source) {
        //UI fix&animation
        $(el).addClass('icon-holding');
        $(el).removeClass('magictime');
        vm.editingId = ko.contextFor(el).$data.editingId;
    }).on('dragend', function(el) {
        //UI fix&animation
        $(el).addClass('icon-holding');
        //refresh db and selection
        vm.db.valueHasMutated();
        vm.selection.valueHasMutated();
        //call draw map with correct amount of arguments
        //switch (vm.selection().length) {
        //case 0:
        //    line_chart_players();
        //    line_chart_price();
        //    map_chart();
        //    break;
        //case 1:
        //    line_chart_players(vm.selection()[0].parsed_data, vm.colors[0]);
        //    line_chart_price(vm.selection()[0].parsed_data, vm.colors[0]);
        //    map_chart(vm.selection()[0].details)
        //    break;
        //case 2:
        //    line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1]);
        //    line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1]);
        //    map_chart(vm.selection()[0].details,vm.selection()[1].details)
        //    break;
        //case 3:
        //    line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2]);
        //    line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2]);
        //    map_chart(vm.selection()[0].details,vm.selection()[1].details,vm.selection()[2].details)
        //    break;
        //case 4:
        //    line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3]);
        //    line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3]);
        //    map_chart(vm.selection()[0].details,vm.selection()[1].details,vm.selection()[2].details,vm.selection()[3].details)
        //    break;
        //case 5:
        //    line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3], vm.selection()[4].parsed_data, vm.colors[4]);
        //    line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3], vm.selection()[4].parsed_data, vm.colors[4]);
        //    map_chart(vm.selection()[0].details,vm.selection()[1].details,vm.selection()[2].details,vm.selection()[3].details,vm.selection()[4].details)
        //    break;
        //case 6:
        //    line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3], vm.selection()[4].parsed_data, vm.colors[4], vm.selection()[5].parsed_data, vm.colors[5]);
        //    line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3], vm.selection()[4].parsed_data, vm.colors[4], vm.selection()[5].parsed_data, vm.colors[5]);
        //    map_chart(vm.selection()[0].details,vm.selection()[1].details,vm.selection()[2].details,vm.selection()[3].details,vm.selection()[4].details,vm.selection()[5].details)
        //}
    }).on('drop', function(el, target, source, sibling) {
        //Adding to selection
        if (isGameSelection(target)) {
            vm.db.remove(function(item) {
                return item.details.id == vm.editingId
            });
            vm.selection.push(ko.dataFor(el));
        }//Adding to db
        else if (isGameDB(target)) {
            vm.selection.remove(function(item) {
                return item.details.id == vm.editingId
            });
            vm.db.push(ko.dataFor(el));
        }
        //Remove extra visual element to prevent duplicated icons
        el.remove();
    });
}
function isGameSelection(elm) {
    return elm.id == "game-selection" ? true : false;
}
function isGameDB(elm) {
    return elm.id == "game-db" ? true : false;
}
function debugeer(arg1, arg2, arg3) {
    console.log('debug');
    //data-bind="style: { backgroundColor: debugeer()}"
}
function parse_line_chart_interactive() {
    var data_parsed = {
        data: []
    };
    //populate date
    date_array = vm.db()[0].parsed_data.data.map(function(a) {
        return a.date_default;
    });
    for (var i = 0; i < 730; i++) {
        var json = {};
        json.date = date_array[i];
        for (var j = 0; j < vm.db().length; j++) {
            $.extend(json, constructJson(vm.db()[j].details.data.name, vm.db()[j].parsed_data.data[i].players));
        }
        data_parsed.data.push(json);
    }
}
function constructJson(jsonKey, jsonValue) {
    var jsonObj = {};
    jsonObj[jsonKey] = jsonValue;
    return jsonObj;
}
