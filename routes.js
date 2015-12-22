Router.route('/:boardId', function() {
    console.log('boardId', this.params.boardId);

    Meteor.call("enterBoard", this.params.boardId);
    //this.set('boardId', this.params.boardId);
    this.render('board');
});

Router.route('/card', function() {
    this.render('card');
});
