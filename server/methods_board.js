Meteor.methods({
    heartbeat: function(userId, boardSlug) {
        if(Meteor.isServer) {
            BoardUsers.update({
                boardSlug: boardSlug,
                userId: userId
            }, {
                $set: {
                    date: new Date()
                }
            });
        }


        // remove older user sessions
        var before = new Date();
        before.setMinutes(before.getMinutes() - 30);
        BoardUsers.remove({
            date: {
                $lt: before
            }
        });
    },
    enterBoard: function(userId, boardSlug, theme) {
        console.log('enterBoard', userId, boardSlug, theme);
        if (!boardSlug) throw new Meteor.Error("missing-params");

        // search for board
        var board = Boards.findOne({
            slug: boardSlug
        });

        // if not found insert board and fetch
        if (!board) {
            Boards.insert({
                slug: boardSlug,
                createdAt: new Date(),
                //owner: Meteor.userId(),
                //username: Meteor.user().username
            });

            var board = Boards.findOne({
                slug: boardSlug
            });
        }

        // lookup
        var boardUser = BoardUsers.findOne({
            boardSlug: boardSlug,
            userId: userId
        });

        if (!boardUser) {
            // add new
            BoardUsers.insert({
                userId: userId,
                date: new Date(),
                boardSlug: boardSlug,
                cardNumber: false,
                theme: theme
            });
            var boardUser = BoardUsers.findOne({
                boardSlug: boardSlug,
                userId: userId
            });
        } else {
            // update
            BoardUsers.update(boardUser._id, {
                $set: {
                    date: new Date(),
                    // cardNumber: false,
                    // cardDate: new Date(),
                    theme: theme
                }
            });
        }
    },
    leaveBoard: function(userId, boardSlug) {
        BoardUsers.remove({
            userId: userId,
            boardSlug: boardSlug
        });
    },
    setCard: function(userId, boardSlug, cardNumber, flipped, theme) {
        var boardUser = BoardUsers.findOne({
            boardSlug: boardSlug,
            userId: userId
        });

        BoardUsers.update(boardUser._id, {
            $set: {
                date: new Date(),
                flipped: flipped,
                cardNumber: cardNumber,
                cardDate: new Date(),
                theme: theme
            }
        });
    }
});
