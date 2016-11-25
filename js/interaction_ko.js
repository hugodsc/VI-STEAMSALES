var vm = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
};
 
ko.applyBindings(new vm("Planet", "Earth")); 