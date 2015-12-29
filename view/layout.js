if (Meteor.isClient) {
  Template.layout.helpers({
    userId: function() {
      return superheros[Session.get("userId")]
    },
    platformClassName: function() {
      if (Meteor.isCordova) {
        return "platform-cordova";
      }
      if (Meteor.isClient) {
        return "platform-web";
      }
    }
  });
  Template.layout.events({});
}
