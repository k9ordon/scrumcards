if (Meteor.isClient) {
    Template.boardUser.helpers({
        activeClassName: function() {
            return this.cardNumber ? "active" : "";
        },
        flippedClassName: function() {
            return (this.cardNumber && this.cardNumber != -1) ? "flipped" : "";
        },
        userName: function(){
            return superheros[this.userId];
        },
        // userImageSrc: function() {
        //     return superheros[this.userId].thumbnail.path + '.' + superheros[this.userId].thumbnail.extension;
        // }
    });
    Template.boardUser.events({
    });
}
