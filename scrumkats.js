var cards = [{
    number: "0"
}, {
    number: .5
}, {
    number: 1
}, {
    number: 2
}, {
    number: 3
}, {
    number: 5
}, {
    number: 8
}, {
    number: 13
}, {
    number: 20
}, {
    number: 40
}, {
    number: "?"
}, {
    number: "∞"
}];

if (Meteor.isClient) {
    Session.setDefault('current', false);
    Session.setDefault('flipped', false);

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

    Template.card.helpers({
        activeClassName: function() {
            return this.number === Session.get("current") ? "active" : ""
        },
        flippedClassName: function() {
            return this.number === Session.get("current") && Session.get("flipped") ? "flipped" : ""
        }
    });
    Template.card.events({
        "click .card:not(.active)": function(e) {
            return Session.set("current", this.number), Session.set("flipped", !1), !1
        },
        "click .card.active": function(e) {
            return Session.set("flipped", Session.get("flipped") ? !1 : !0), !1
        }
    });
}
