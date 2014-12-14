jQuery(function(){

    var Card = COLOR_MATCHER.modules.Card;

    COLOR_MATCHER.modules.CardsCollection = Backbone.Collection.extend({

        model: Card,
        localStorage: new Backbone.LocalStorage("Cards-backbone"),
        time: 0,
        score: 0,

        done: function() {
            return this.where({done: true});
        },

        remaining: function() {
            return this.where({done: false});
        },

        correct: function() {
            return this.where({correct: true});
        },

        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },

        checkTheAnswer: function(model, answer) {
            if(_.isUndefined(model) || _.isUndefined(answer)) return false;

            info("checkTheAnswer()");
            model = model.toJSON();
            return (answer.attr("data-answer") == model.correctAnswer.toString());
        },

        comparator: 'order'

    });

});