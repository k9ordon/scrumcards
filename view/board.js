if (Meteor.isClient) {
    Meteor.subscribe("boards");

    Template.board.helpers({
        cards: cards,
        boardUsers : function() {
            var before = new Date();
            before.setSeconds(before.getSeconds() - 30);

            console.log('boardUseres', before);
            return BoardUsers.find({
                // userId: { $ne: Session.get('userId') },
                boardSlug: this.boardSlug,
                // date: {
                //     $gt: before
                // }
            }
            // , {
            //     sort: {
            //         cardDate: -1
            //     }
            // }
            );
        },
        hasActiveCardClassName: function() {
            return Session.get("cardNumber") ? "hasActiveCard" : ""
        },
        title: function() {
            return superheros[Session.get("userId")] + '@' + Session.get("boardSlug")
        },
        isCurrentTheme: function(theme) {
            return Session.get('theme') == theme;
        },
        spectator: function() {
            return Session.get('spectator');
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
                false,
                false,
                Session.get("theme")
            );
        },
        "click .boardUsers": function(e) {
            console.log("clicked boardUsers");


            if(Session.get("spectator")) {
                Session.set("spectator", false);

                Meteor.call("enterBoard",
                    Session.get('userId'),
                    Session.get('boardSlug'),
                    Session.get('theme')
                );
            }
            else if(Session.get('cardNumber')) {
                Session.set("cardNumber", false);
                Session.set("flipped", false);

                Meteor.call("setCard",
                    Session.get('userId'),
                    Session.get('boardSlug'),
                    false,
                    false,
                    Session.get("theme")
                );
            } else {
                Session.set("spectator", true);

                Meteor.call("leaveBoard",
                    Session.get('userId'),
                    Session.get('boardSlug')
                );
            }
        },
        "change .boardThemeSelect select": function(e) {
            console.log('theme changed', e.target.value);

            Session.set("theme", e.target.value);
            Cookie.set("theme", e.target.value);
        }
    });
}
