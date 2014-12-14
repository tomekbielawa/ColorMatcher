jQuery(function(){

var CardsCollection = COLOR_MATCHER.modules.CardsCollection;

var Cards = new CardsCollection;
COLOR_MATCHER.modules.Cards = Cards;

var CardView = Backbone.View.extend({
    template: _.template(jQuery('#card-template').html()),

    events: {
        "click .answer-button"  : "checkTheAnswer"
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        this.$el.css("display", "none");

        this.$el.html(this.template({
                card: this.model.toJSON(),
                colorTxt: I18n['colorTxt'],
                meaningTxt: I18n['meaningTxt'],
                yesBtnTxt: I18n['yesBtnTxt'],
                noBtnTxt: I18n['noBtnTxt'],
                titleTxt: I18n['title']
            })
        );

        this.$el.fadeIn();
        this.$el.toggleClass('done', this.model.get('done'));
        return this;
    },

    checkTheAnswer: function(e) {
        var theAnswerIsCorrect = Cards.checkTheAnswer(this.model, $(e.currentTarget));
        if(theAnswerIsCorrect) {
            Cards.score += pointsForAGoodAnswer;
        }

        var appView = new AppView();
        window.setTimeout( appView.createCard(), 2000 );

        showAnswerResultBox(theAnswerIsCorrect);
    },

    clear: function() {
        this.model.destroy();
    }

});


var AppView = Backbone.View.extend({

    el: jQuery("#color-matcher-app"),
    statsTemplate: _.template(jQuery('#stats-template').html()),

    events: {
        "click #start-game": "startGame"
    },

    initialize: function() {
        this.listenTo(Cards, 'add', this.addOne);

        Cards.fetch();
    },

    clearGames: function(){
        Cards.score = 0;
        _.invoke(Cards.done(), 'destroy');
        _.invoke(Cards.remaining(), 'destroy');
    },

    createCard: function(){
        var card = Cards.create({});

        COLOR_MATCHER.modules.actualCard = card;

        var view = new CardView({model: card});

        this.$("#stats").html(this.statsTemplate({
                cardNumberLbl: I18n['cardNumber'],
                cardNumber: card.get('order'),
                timeLbl: I18n['time'],
                time: Cards.time,
                scoreLbl: I18n['score'],
                score: Cards.score
            })
        );


        this.$("#main #cards-container").html(view.render().el);

        return card;
    },

    startGame: function() {
        info("Start game");

        this.clearGames();

        return this.createCard();
    },

     addOne: function(card) {
         var view = new CardView({model: card});
     },

});

var App = new AppView;

});