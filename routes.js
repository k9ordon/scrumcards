Router.route('/', {
  name: 'home'
});

Router.route('/:boardSlug', {
  name: 'board',
  subscriptions: function() {
    var boardSlug = this.params.boardSlug.toLowerCase();

    this.subscribe('boardUsers', boardSlug),
      this.subscribe('board', boardSlug).wait();
  },
  onRun: function() {
    var boardSlug = this.params.boardSlug.toLowerCase();

    console.log('boardSlug', boardSlug);

    Session.set('boardSlug', boardSlug);

    Meteor.call("enterBoard", Session.get('userId'), boardSlug, Session.get('theme'));

    Meteor.call("heartbeat", Session.get('userId'), boardSlug);
    Meteor.setInterval(function() {
      Meteor.call("heartbeat", Session.get('userId'), boardSlug);
    }, (30 * 1000));

    this.next();
  },
  onStop: function() {
    var boardSlug = this.params.boardSlug.toLowerCase();
    console.log('boardSlug exit', boardSlug);

    Meteor.call("leaveBoard",
        Session.get('userId'),
        boardSlug
    );
  },
  data: function() {
    var boardSlug = this.params.boardSlug.toLowerCase();
    var board = Boards.findOne({
      slug: boardSlug
    });

    return {
      boardSlug: boardSlug,
      board: board
    };
  }
});
//
// Router.route('/:boardSlug', function() {
//
//     if (this.ready()) {
//
//     }else {
//         console.log('not ready', boardSlug);
//     }
//
//     var board = Boards.findOne({
//         slug: boardSlug
//     });
//
//     this.render('board', {
//         data: {
//             boardSlug: boardSlug,
//             board: board,
//         }
//     });
// });

Router.route('/card', function() {
  this.render('card');
});
