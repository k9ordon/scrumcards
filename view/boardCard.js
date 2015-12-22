if (Meteor.isClient) {
    Template.boardCard.helpers({
        activeClassName: function() {
            return this.number === Session.get("cardNumber") ? "active" : ""
        },
        flippedClassName: function() {
            return this.number === Session.get("cardNumber") && Session.get("flipped") ? "flipped" : "";
        }
    });
    Template.boardCard.events({
        "click .boardCard:not(.active)": function(e) {
            console.log("setCard", Session.get('userId'), Session.get('boardSlug'), Session.get("cardNumber"));

            Session.set("cardNumber", this.number);
            Session.set("flipped", false);

            Meteor.call("setCard",
                Session.get('userId'),
                Session.get('boardSlug'),
                -1
            );
            return false;
        },
        "click .boardCard.active": function(e) {
            Meteor.call("setCard",
                Session.get('userId'),
                Session.get('boardSlug'),
                Session.get("flipped") ? -1 : this.number
            );

            Session.set("flipped",
                Session.get("flipped") ? false : true
            );
            return false;
        }
    });
}
