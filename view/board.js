if (Meteor.isClient) {
    Template.board.helpers({
        cards: cards,
        hasActiveCardClassName: function() {
            return Session.get("current") ? "hasActiveCard" : ""
        }
    });

    Template.board.events({
        "click .board": function(e) {
            return console.log("clicked board"), Session.set("current", !1), Session.set("flipped", !1), !1
        }
    });
}
