Router.route('/', function() {
    this.render('home');
});

Router.route('/:boardSlug', function() {
    var boardSlug = this.params.boardSlug.toLowerCase();

    // console.log('boardSlug', boardSlug);

    Session.set('boardSlug', boardSlug);

    this.wait([
        Meteor.subscribe('board', boardSlug),
        Meteor.subscribe('boardUsers', boardSlug)
    ]);

    if (this.ready()) {
        Meteor.call("enterBoard", Session.get('userId'), boardSlug, Session.get('theme'));
        Meteor.setInterval(function() {
            Meteor.call("heartbeat", Session.get('userId'), boardSlug);
        }, (30*1000));
    }else {
        console.log('not ready', boardSlug);
    }

    var board = Boards.findOne({
        slug: boardSlug
    });

    var before = new Date();
    before.setSeconds(before.getSeconds() - 30);

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
