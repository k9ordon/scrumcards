if (Meteor.isClient) {
    Template.boardCard.helpers({
        activeClassName: function() {
            return this.number === Session.get("current") ? "active" : ""
        },
        flippedClassName: function() {
            return this.number === Session.get("current") && Session.get("flipped") ? "flipped" : ""
        }
    });
    Template.boardCard.events({
        "click .boardCard:not(.active)": function(e) {
            return Session.set("current", this.number), Session.set("flipped", !1), !1
        },
        "click .boardCard.active": function(e) {
            return Session.set("flipped", Session.get("flipped") ? !1 : !0), !1
        }
    });
}
