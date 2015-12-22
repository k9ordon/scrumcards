if (Meteor.isClient) {
    Meteor.subscribe("boards");

    Template.board.helpers({
        cards: cards,
        hasActiveCardClassName: function() {
            return Session.get("cardNumber") ? "hasActiveCard" : ""
        },
        title: function() {
            return superheros[Session.get("userId")] + '@' + Session.get("boardSlug")
        }
    });

    Template.board.events({
        "click .board": function(e) {
            console.log("clicked board");

            Session.set("cardNumber", false);
            Session.set("flipped", false);

            Meteor.call("setCard",
                Session.get('userId'),
                Session.get('boardSlug'),
                false
            );
        },
        "click .boardUsers": function(e) {
            console.log("clicked board");

            Session.set("cardNumber", false);
            Session.set("flipped", false);

            Meteor.call("setCard",
                Session.get('userId'),
                Session.get('boardSlug'),
                false
            );
        }
    });
}
