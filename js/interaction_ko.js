var vm = {};
function interactVmImplement() {
    var self = this;
    self.db = ko.observableArray();
    self.selection = ko.observableArray();
    self.selected = ko.observable();
    self.colors = ['#dff0d8', '#d9edf7', '#f2dede', '#e7def2', '#dbf59c', '#f1ea97'];
    //Populate db
    self.db.push(csgo);
    self.db.push(witcher3);
    self.db.push(asseto);
    self.db.push(banner);
    self.db.push(gta);
    self.db.push(pcars);
    self.db.valueHasMutated();
    //Util
    self.editingId = ko.observable();
}
;vm = new interactVmImplement();
ko.applyBindings(vm);
window.onload = function() {
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
            line_chart_players();
            line_chart_price();
            break;
        case 1:
            line_chart_players(vm.selection()[0].parsed_data, vm.colors[0]);
            line_chart_price(vm.selection()[0].parsed_data, vm.colors[0]);
            break;
        case 2:
            line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1]);
            line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1]);
            break;
        case 3:
            line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2]);
            line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2]);
            break;
        case 4:
            line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3]);
            line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3]);
            break;
        case 5:
            line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3], vm.selection()[4].parsed_data, vm.colors[4]);
            line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3], vm.selection()[4].parsed_data, vm.colors[4]);
            break;
        case 6:
            line_chart_players(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3], vm.selection()[4].parsed_data, vm.colors[4], vm.selection()[5].parsed_data, vm.colors[5]);
            line_chart_price(vm.selection()[0].parsed_data, vm.colors[0], vm.selection()[1].parsed_data, vm.colors[1], vm.selection()[2].parsed_data, vm.colors[2], vm.selection()[3].parsed_data, vm.colors[3], vm.selection()[4].parsed_data, vm.colors[4], vm.selection()[5].parsed_data, vm.colors[5]);
        }
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
