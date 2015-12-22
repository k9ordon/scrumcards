if (Meteor.isServer) {
    Meteor.publish('board', function(slug) {
        console.log('slugcall', Boards.find({
            slug: slug
        }));

        return Boards.find({
            slug: slug
        });
    });
}
