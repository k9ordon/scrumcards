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

    if (this.ready()) {
        Meteor.call("enterBoard", Session.get('userId'), boardSlug, Session.get('theme'));

        // Meteor.setInterval(function() {
        //     Meteor.call("heartbeat", Session.get('userId'), boardSlug);
        // }, (30*1000));
    }else {
        console.log('not ready', boardSlug);
    }

    var board = Boards.findOne({
        slug: boardSlug
    });

    this.render('board', {
        data: {
            boardSlug: boardSlug,
            board: board,
        }
    });
});

Router.route('/card', function() {
    this.render('card');
});
