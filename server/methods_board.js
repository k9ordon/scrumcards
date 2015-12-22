Meteor.methods({
  enterBoard: function (slug) {

    if(!slug) throw new Meteor.Error("missing-params");

    // search for board
    var board = Boards.findOne({ slug:slug });

    // if not found insert board and fetch
    if(!board) {
        Boards.insert({
          slug: slug,
          createdAt: new Date(),
          //owner: Meteor.userId(),
          //username: Meteor.user().username
        });

        var board = Boards.findOne({ slug:slug });
    }

    // remove older users from list
    var before = new Date();
    before.setMinutes(before.getMinutes() - 1);
    BoardUsers.remove({
        date: before
    });

    // add current user to list
    BoardUsers.remove({
        date: before
    })


  }
});
