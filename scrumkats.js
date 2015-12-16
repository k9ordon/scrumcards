var cards = [{
  number: .5
},{
  number: 1
}, {
  number: 2
}, {
  number: 3
}, {
  number: 4
}, {
  number: 5
}, {
  number: 6
}, {
  number: 7
}];

if (Meteor.isClient) {
  Session.setDefault('current', false);
  Session.setDefault('flipped', false);

  Template.board.helpers({
    cards: cards,
    hasActiveCardClassName: function() {
      return Session.get('current') ? 'hasActiveCard' : '';
    }
  });

  Template.board.events({
    'click .board': function(e) {
      console.log('clicked board');

      Session.set('current', false);
      Session.set('flipped', false);

      return false;
    }
  });

  Template.card.helpers({
    activeClassName: function() {
      return (this.number === Session.get('current')) ? 'active' : '';
    },
    flippedClassName: function() {
      return (this.number === Session.get('current') && Session.get('flipped')) ? 'flipped' : '';
    }
  });

  Template.card.events({
    'click .card:not(.active)': function(e) {
      //$el = e.target;
      //console.log('clicked card', $el.getBoundingClientRect(), this.number);

      Session.set('current', this.number);
      Session.set('flipped', false);
      return false;
    },
    'click .card.active': function(e) {
      Session.set('flipped', Session.get('flipped') ? false : true);
      return false;
    }
  });
}
