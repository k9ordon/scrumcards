Router.route('/:boardSlug', function() {
    console.log('boardSlug', this.params.boardSlug);

    this.wait(Meteor.subscribe('board', this.params.boardSlug));
    Meteor.call("enterBoard", this.params.boardSlug);

    var board = Boards.findOne({
        slug: this.params.boardSlug
    });

    if (this.ready()) {

        this.render('board', {
            data: {
                board: board
            }
        });

    } else {
        this.render('board');
    }
});

Router.route('/card', function() {
    this.render('card');
});
