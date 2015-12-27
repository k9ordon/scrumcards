if (Meteor.isClient) {
    Template.boardUser.helpers({
        activeClassName: function() {
            return this.cardNumber ? "active" : "idle";
        },
        flippedClassName: function() {
            return this.flipped ? "flipped" : "";
        },
        userName: function(){
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
        }
        // userImageSrc: function() {
        //     return superheros[this.userId].thumbnail.path + '.' + superheros[this.userId].thumbnail.extension;
        // }
    });
    Template.boardUser.events({
    });
}
