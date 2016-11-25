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
    }).on('drop', function(el, target, source, sibling) {
        if(isGameSelection(target.id)) $(el).switchClass("icon-db", "icon-selection", 1000, "easeInOutQuad");
        else if(isGameDB(target.id)) $(el).switchClass("icon-selection", "icon-db", 1000, "easeInOutQuad");
    }).on('over', function(el, container) {
        container.className += ' ex-over';
    }).on('out', function(el, container) {
        container.className = container.className.replace('ex-over', '');
    });
    ;
}

function isGameSelection(id) {
    return id == "game-selection" ? true : false;
}

function isGameDB(id) {
    return id == "game-db" ? true : false;
}