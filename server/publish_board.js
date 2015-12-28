if (Meteor.isServer) {
    Meteor.publish('board', function(slug) {
        return Boards.find({
            slug: slug
        });
    });

    Meteor.publish('boardUsers', function(boardSlug) {

        var before = new Date();
        before.setSeconds(before.getSeconds() - 30);

        return BoardUsers.find({
            //userId: { $ne: Session.get('userId') },
            boardSlug: boardSlug,
            date: {
                $gt: before
            }
        });
    });

}
