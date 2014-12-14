    var COLOR_MATCHER = window.COLOR_MATCHER || {};
    COLOR_MATCHER.modules = {};

    COLOR_MATCHER.modules.Card = Backbone.Model.extend({

        defaults: function() {
            var cardColorNumber = getRandomColor();
            var randomColorNumber = getRandomColor();
            var randomNameNumber = getRandomColor();

            var correctAnswer = (cardColorNumber == randomColorNumber) ? true: false;

            return {
                uid: _.uniqueId('card_'),
                colorTxt: colorsMap[cardColorNumber].name,
                colorCss: colorsMap[cardColorNumber].css,
                colorRandomCss: colorsMap[randomColorNumber].css,
                colorRandomTxt: colorsMap[randomNameNumber].name,
                correctAnswer:  correctAnswer,
                order: (COLOR_MATCHER.modules.Cards) ? COLOR_MATCHER.modules.Cards.nextOrder() : 1,
                done: true,
                correct: false
            };
        },

        toggle: function() {
            this.save({done: !this.get("done")});
        }

    });