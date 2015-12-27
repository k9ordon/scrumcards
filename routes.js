Router.route('/', function() {
    this.render('home');
});

Router.route('/:boardSlug', function() {
    var boardSlug = this.params.boardSlug.toLowerCase();

    console.log('boardSlug', boardSlug);

    Session.set('boardSlug', boardSlug);

    this.wait([
        Meteor.subscribe('board', boardSlug),
        Meteor.subscribe('boardUsers', boardSlug)
    ]);

    Meteor.call("enterBoard", Session.get('userId'), boardSlug);

    var board = Boards.findOne({
        slug: boardSlug
    });

    var before = new Date();
    before.setMinutes(before.getMinutes() - 1);

    var boardUsers = BoardUsers.find({
        //userId: { $ne: Session.get('userId') },
        boardSlug: boardSlug,
        date: {
            $gt: before
        }
    });

    this.render('board', {
        data: {
            board: board,
            boardUsers: boardUsers
        }
    });
});

Router.route('/card', function() {
    this.render('card');
});
