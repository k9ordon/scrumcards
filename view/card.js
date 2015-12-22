if (Meteor.isClient) {
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
