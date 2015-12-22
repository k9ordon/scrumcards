if (Meteor.isClient) {
    Template.layout.helpers({
        userId: function() {
            return Session.get("userId")
        }
    });
    Template.layout.events({});
}
