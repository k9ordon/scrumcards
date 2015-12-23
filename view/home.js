if (Meteor.isClient) {
    Template.home.helpers({
        userId: function() {
            return superheros[Session.get("userId")]
        }
    });
    Template.home.events({
        "submit .gotoBoard": function(e) {
            e.preventDefault();
            var hash = event.target.hash.value;
            if(!hash) return alert('enter a hash');
            Router.go('/'+hash);
        }
    });
}
