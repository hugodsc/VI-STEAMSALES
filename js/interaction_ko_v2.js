//Knockout - ViewModel
var vm = {};
function interactVmImplement() {
    var self = this;
    self.db = ko.observableArray();
    self.selection = ko.observableArray();
    self.selected = ko.observable();
    self.colors = ['#ea1c1c', 'black', '#1e12bc', '#e5d712', '#1de044', '#e5981b'];
    //DB
    self.reset = function() {
        self.selection.removeAll();
        self.db.removeAll();
        _.each(input, function(elm, index, lst) {
            self.db.push(elm)
        });
    }
    self.setFilter = function(filter) {
        self.reset();
        var tmp_db = _.filter(vm.db(), function(elm) {
            return vm.containsGenre(elm, filter);
        });
        self.db.removeAll();
        _.each(tmp_db, function(elm, index, lst) {
            self.db.push(elm)
        });
        var tmp_selection = _.filter(vm.selection(), function(elm) {
            return vm.containsGenre(elm, filter);
        });
        self.selection.removeAll();
        _.each(tmp_selection, function(elm, index, lst) {
            self.selection.push(elm)
        });
    }

    self.getAllGenres = function() {
        var txt = '';
        _.each(vm.selected().details.data.genres, function(el) {
            txt += el.description + ", ";
        });
        return txt.slice(0, txt.length-2);
    }
    
    self.containsGenre = function(obj, genre) {
        var genres = obj.details.data.genres;
        var ret = _.find(genres, function(elm) {
            return elm.description == genre
        });
        return ret != null;
    }
    self.reset();
    selectElement = function(elm) {
        self.selected(elm);
    }
    self.selected.subscribe(function() {
        zoomToCountry(self.selected().details.data.country[1]);
    });
    //Util
    self.editingId = ko.observable();
    self.getIndex = function(index) {
        return index();
    }
    self.status = function() {
        console.log(self.db().length + " :: db.length");
        console.log(self.selection().length + " :: selection.length");
        if (vm.selected() != undefined)
            console.log(self.selected().details.data.name + " :: selected item");
    }
    self.getColor = function(index) {
        //$parent.colors[$index()
        return vm.colors[index()];
    }
}
vm = new interactVmImplement();
ko.applyBindings(vm);
//Interaction
$(document).ready(function() {
    //map_chart();
    dragula_setup();
});
//Dragula
function dragula_setup() {
    updateWords()
    dragula([document.getElementById('game-db'), document.getElementById('game-selection')], {
        isContainer: function(el) {
            return false;
        },
        moves: function(el, source, handle, sibling) {
            return true;
        },
        accepts: function(el, target, source, sibling) {
            return true;
        },
        invalid: function(el, handle) {
            return false;
        },
        direction: 'horizontal',
        copy: false,
        copySortSource: false,
        revertOnSpill: false,
        removeOnSpill: false,
        mirrorContainer: document.body,
        ignoreInputTextSelection: true// 
    }).on('drag', function(el, source) {
        //UI fix&animation
        $(el).addClass('icon-holding');
        $(el).removeClass('magictime');
        vm.editingId = ko.contextFor(el).$data.details.id;
    }).on('dragend', function(el) {
        //UI fix&animation
        $(el).addClass('icon-holding');
        //refresh db and selection
        vm.db.valueHasMutated();
        vm.selection.valueHasMutated();
        //call draw map with correct amount of arguments
        switch (vm.selection().length) {
        case 0:
            console.log("Comparing 0 games.");
            destroy_price_chart();
            destroy_player_chart();
            //map_chart();
            break;
        case 1:
            console.log("Comparing 1 games.");
            create_price_chart();
            create_player_chart();
            //map_chart(vm.selection()[0].details)
            break;
        case 2:
            console.log("Comparing 2 games.");
            create_price_chart();
            create_player_chart();
            //map_chart(vm.selection()[0].details, vm.selection()[1].details)
            break;
        case 3:
            create_price_chart();
            create_player_chart();
            //map_chart(vm.selection()[0].details, vm.selection()[1].details, vm.selection()[2].details)
            break;
        case 4:
            create_price_chart();
            create_player_chart();
            //map_chart(vm.selection()[0].details, vm.selection()[1].details, vm.selection()[2].details, vm.selection()[3].details)
            break;
        case 5:
            create_price_chart();
            create_player_chart();
            //map_chart(vm.selection()[0].details, vm.selection()[1].details, vm.selection()[2].details, vm.selection()[3].details, vm.selection()[4].details)
            break;
        case 6:
            create_price_chart();
            create_player_chart();
            //map_chart(vm.selection()[0].details, vm.selection()[1].details, vm.selection()[2].details, vm.selection()[3].details, vm.selection()[4].details, vm.selection()[5].details)
            break;
        }
    }).on('drop', function(el, target, source, sibling) {
        //Adding to selection
        if (isGameSelection(target)) {
            vm.db.remove(function(item) {
                return item.details.id == ko.dataFor(el).details.id
            });
            vm.selection.push(ko.dataFor(el));
        }//Adding to db
        else if (isGameDB(target)) {
            vm.selection.remove(function(item) {
                return item.details.id == ko.dataFor(el).details.id
            });
            vm.db.push(ko.dataFor(el));
        }
        //Remove extra visual element to prevent duplicated icons
        el.remove();
    })
}
//Util
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
    date_array = vm.selection()[0].parsed_data.data.map(function(a) {
        return a.date_default;
    });
    for (var i = 0; i < 730; i++) {
        var json = {};
        json.date = date_array[i];
        for (var j = 0; j < vm.selection().length; j++) {
            $.extend(json, constructJson(vm.selection()[j].details.data.name, vm.selection()[j].parsed_data.data[i].price));
        }
        data_parsed.data.push(json);
    }
}
function constructJson(jsonKey, jsonValue) {
    var jsonObj = {};
    jsonObj[jsonKey] = jsonValue;
    return jsonObj;
}
