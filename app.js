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

    var theme = Cookie.get('theme');
    if(!theme) {
        Cookie.set('theme', 'theme1');
        theme = Cookie.get('theme');
    }
    Session.set("theme", theme);

}

Router.configure({
  layoutTemplate: 'layout'
});


BoardUsers.allow({
  insert: function (userId, doc) {
    return true;
  }
})
