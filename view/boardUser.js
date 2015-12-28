if (Meteor.isClient) {
    Template.boardUser.helpers({
        activeClassName: function() {
            console.debug('activeClassName', this.cardNumber);
            return this.cardNumber ? "active" : "idle";
        },
        flippedClassName: function() {
            console.debug('flippedClassName', this.flipped);
            return this.flipped ? "flipped" : "";
        },
        userName: function(){
            console.debug('userName', this.userId);
            return superheros[this.userId];
        },
        cardId: function() {
            for(var i=0; i < cards.length; i++) {
                if(cards[i].number == this.cardNumber) return cards[i].id;
            }
            return false;
        },
        isCurrentUserClassName: function() {
            return Session.get('userId') === this.userId ? 'isCurrentUser': '';
        },
        isOnline: function() {
            var before = new Date();
            before.setSeconds(before.getSeconds() - 30);

            return this.date > before;
        }
        // userImageSrc: function() {
        //     return superheros[this.userId].thumbnail.path + '.' + superheros[this.userId].thumbnail.extension;
        // }
    });
    Template.boardUser.events({
    });
}
