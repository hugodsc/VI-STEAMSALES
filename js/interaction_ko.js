var vm = {};

function interactVmImplement() {
    var self = this;

    self.db = ko.observableArray();
    self.selection = ko.observableArray();
    self.selected = ko.observable();

    //Populate db
    self.db.push(csgo);
    self.db.push(witcher3);

    self.db.valueHasMutated();

    //Util
    self.editingId = ko.observable();

//testzone
    self.firstName = ko.observable();
    self.lastName = ko.observable();
 
    self.fullName = ko.computed(function() {
        return self.firstName() + " " + self.lastName();
    }, this);

    self.url = ko.observable("year-end.html");
    self.details = ko.observable("Report including final year-end statistics");
    self.imagePath = "images/witcher3.png";

};
 
vm = new interactVmImplement();
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
        //$(el).addClass('icon-holding');
        //$(el).removeClass('magictime');
        
        vm.editingId = ko.contextFor(el).$data.details.id;

        //vm.db.remove( function (item) { return item.details.id == ko.contextFor(el).$data.details.id; } );
    }).on('dragend', function(el) {
        //UI fix&animation
        //$(el).addClass('icon-holding');
        //$(el).addClass("magictime slideRightReturn");

        //refresh db and selection
        vm.db.valueHasMutated();
        vm.selection.valueHasMutated();
    }).on('drop', function(el, target, source, sibling) {
        console.log('drop');
        //Adding to selection
        if(isGameSelection(target)) {
            vm.db.remove( function (item) { return item.details.id == vm.editingId } );
            vm.selection.push(ko.dataFor(el));
        }
        //Adding to db
        else if(isGameDB(target)) {
            vm.selection.remove( function (item) { return item.details.id == vm.editingId } );
            vm.db.push(ko.dataFor(el));
        }

    });
}

function isGameSelection(elm) {
    return elm.id == "game-selection" ? true : false;
}
function isGameDB(elm) {
    return elm.id == "game-db" ? true : false;
}