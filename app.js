Boards = new Mongo.Collection("boards");

if (Meteor.isClient) {
    Session.setDefault('current', false);
    Session.setDefault('flipped', false);
}

Router.configure({
  layoutTemplate: 'layout'
});
