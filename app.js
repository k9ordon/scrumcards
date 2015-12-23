Boards = new Mongo.Collection("boards");
BoardUsers = new Mongo.Collection("boardUsers");

if (Meteor.isClient) {
    Session.setDefault('current', false);
    Session.setDefault('flipped', false);

    var userId = Cookie.get('userId');//Session.get("userId");
    if(!userId || !superheros[userId]) {
        var random = Math.floor(Math.random()*superheros.length);
        Cookie.set('userId', random);
        userId = Cookie.get('userId');
    }
    Session.set("userId", userId);

}

Router.configure({
  layoutTemplate: 'layout'
});


BoardUsers.allow({
  insert: function (userId, doc) {
    return true;
  }
})
