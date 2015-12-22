if (Meteor.isServer) {
    Meteor.publish('board', function(slug) {
        return Boards.find({
            slug: slug
        });
    });

    if (Meteor.isServer) {
        Meteor.publish('boardUsers', function(boardSlug) {
            return BoardUsers.find({
                boardSlug: boardSlug
            });
        });
    }

}
