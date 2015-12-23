if (Meteor.isClient) {
    Template.layout.helpers({
        userId: function() {
            return superheros[Session.get("userId")]
        }
    });
    Template.layout.events({});
}
