if (Meteor.isClient) {
    Template.boardCard.helpers({
        activeClassName: function() {
            console.debug('activeClassName', this.number);
            return this.number === Session.get("cardNumber") ? "active" : ""
        },
        flippedClassName: function() {
            console.debug('flippedClassName', this.number);
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
                this.number,
                false
            );
            return false;
        },
        "click .boardCard.active": function(e) {
            Meteor.call("setCard",
                Session.get('userId'),
                Session.get('boardSlug'),
                this.number,
                Session.get("flipped") ? false : true
            );

            Session.set("flipped",
                Session.get("flipped") ? false : true
            );
            return false;
        }
    });
}
