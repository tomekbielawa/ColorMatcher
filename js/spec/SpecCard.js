jQuery(function() {

  var test;
  test = {};
  var spyEvent;
  var colorsArray = _.pluck(colorsMap, 'name');
  var colorsArrayTranslated = _.map(colorsArray, function(obj) { return I18n[obj] });

  var Card = COLOR_MATCHER.modules.Card;
  var CardsCollection = COLOR_MATCHER.modules.CardsCollection;
  var Cards = COLOR_MATCHER.modules.Cards;

  beforeEach(function () {
    jasmine.addMatchers({
      toHaveOneOf: function () {
        return {
          compare: function (actual, expected) {
            var result = {};
            actual = (_.isUndefined(actual) ) ? '' : actual;
            actual = (_.isString(actual)) ? actual.trim() : actual;
            expected = (_.isUndefined(expected) || !_.isArray(expected) ) ? colorsArray : expected;

            if (_.isArray(actual)) {
              actual = _.find(actual, function (val) {
                if (_.contains(expected, val)) return val;
              });
            }

            result.pass = _.contains(expected, actual);
            result.message = "Expected a card to have proper color values!";
            info(actual + " in " + expected + " is " + result.pass);

            return result;
          }
        }
      }
    });
  });

  describe("Card Class", function () {

    describe("Models", function () {

      it("should create new Card", function () {
        var newCard = new COLOR_MATCHER.modules.Card()

        expect(newCard).not.toBeUndefined();
      });

      it("should expose an attribute after create", function () {
        var newCard = Cards.create({
          color: colorsMap.red
        });

        expect(newCard.get("color")).toEqual(colorsMap.red);
      });

    });

    describe("CreatingCard", function () {

      it("should a main section be a intro text", function () {
        var introTextContainer = jQuery(".intro-text");
        var leftCardContainer = jQuery("#left-card");
        var rightCardContainer = jQuery("#right-card");

        expect(introTextContainer).toExist();
        expect(introTextContainer).toHaveText("START THE GAME!");
        expect(leftCardContainer).not.toExist();
        expect(rightCardContainer).not.toExist();
      });

      it("should start game button be clicked", function () {
        var spyEvent = spyOnEvent('#start-game', 'click')

        jQuery('#start-game').click()

        expect('click').toHaveBeenTriggeredOn('#start-game')
        expect(spyEvent).toHaveBeenTriggered()
      });

      it("should append cards template in the main container", function () {
        var introTextContainer = jQuery(".intro-text");
        var leftCardContainer = jQuery("#left-card");
        var rightCardContainer = jQuery("#right-card");

        expect(introTextContainer).not.toExist();
        expect(leftCardContainer).toExist();
        expect(rightCardContainer).toExist()
      });

      it("should fill left card with appropriate values", function () {
        var leftCardContainer = jQuery("#left-card");

        expect(leftCardContainer).toExist();
        expect(jQuery(leftCardContainer.selector).text()).toHaveOneOf(colorsArrayTranslated);
        expect(jQuery(leftCardContainer.selector).text()).not.toHaveOneOf(['blues']);
      });

      it("should fill right card with appropriate values", function () {
        var rightCardContainer = jQuery("#right-card");

        expect(rightCardContainer).toExist();
        expect(jQuery(rightCardContainer.selector).text()).toHaveOneOf(colorsArrayTranslated);
        expect(jQuery(rightCardContainer.selector).text()).not.toHaveOneOf(['blues']);
      });

      it("should fill right card with appropriate css class", function () {
        var cssClasses = jQuery("#right-card").attr('class').split(/\s+/);
        var colorAttribute = jQuery("#right-card").attr('data-color');

        expect(cssClasses).toHaveOneOf(colorsArray);
        expect(colorAttribute).toHaveOneOf(colorsArray);
      });

     it("should return cards comparizon", function () {
        var cardColorNumber = jQuery("#left-card").attr("data-color");
        var randomColorNumber = jQuery("#right-card").attr('data-color');
        var correctAnswer = (cardColorNumber == randomColorNumber) ? 'true' : 'false';
        var correctAnswerValuePrinted = jQuery("#correct-answer").attr('data-correct-answer');

        expect(correctAnswer).toBe(correctAnswerValuePrinted);
      });

      it("answer button 'no' should be clickable", function () {
        var answerButton = '.answer-buttons div[data-answer="false"]';
        var spyEvent = spyOnEvent(answerButton, 'click');
        jQuery(answerButton).click();
        expect('click').toHaveBeenTriggeredOn(answerButton);
        expect(spyEvent).toHaveBeenTriggered();
      });

      it("answer button 'yes' should be clickable", function () {
        var answerButton = '.answer-button';
        var spyEvent = spyOnEvent(answerButton, 'click');
        jQuery(answerButton).click();
        expect('click').toHaveBeenTriggeredOn(answerButton);
        expect(spyEvent).toHaveBeenTriggered();
      });

    });

    describe("Answer", function () {
      it("should show answer box after answer clicked", function () {
        expect(jQuery("#correct-answer").attr("data-correct-answer")).not.toBeEmpty();
        expect(jQuery("#correct-answer").find(".glyphicon")).toBeVisible();
      });

      it("should increase score factor", function () {
        var scoreBeforeAction = COLOR_MATCHER.modules.Cards.score;
        var scoreAfterAction = scoreBeforeAction + pointsForAGoodAnswer;

        emulateCorrectAnswer();

        expect(COLOR_MATCHER.modules.Cards.score).toBe(scoreAfterAction);
        expect(jQuery("#score").text()).toBe(scoreAfterAction.toString());
      });

      it("should not increase score factor", function () {
        var scoreBeforeAction = COLOR_MATCHER.modules.Cards.score;

        emulateWrongAnswer();

        expect(COLOR_MATCHER.modules.Cards.score).toBe(scoreBeforeAction);
        expect(jQuery("#score").text()).toBe(scoreBeforeAction.toString());
      });

      it("should increase cart number", function () {
        var cardNumberBeforeAction = COLOR_MATCHER.modules.actualCard.get('order');
        var cardNumberAfterAction = cardNumberBeforeAction + 1;

        emulateCorrectAnswer();

        expect(COLOR_MATCHER.modules.actualCard.get('order')).toBe(cardNumberAfterAction);
        expect(jQuery("#card-number").text()).toBe(cardNumberAfterAction.toString());
      });

    });

  });

});


function emulateCorrectAnswer() {
  var cardColorNumber = jQuery("#left-card").attr("data-color");
  var randomColorNumber = jQuery("#right-card").attr('data-color');
  var correctAnswer = (cardColorNumber == randomColorNumber) ? 'true' : 'false';
  var answerButton = '.answer-buttons .answer-button[data-answer="' + correctAnswer + '"]';
  jQuery(answerButton).click();
}

function emulateWrongAnswer() {
  var cardColorNumber = jQuery("#left-card").attr("data-color");
  var randomColorNumber = jQuery("#right-card").attr('data-color');
  var wrongAnswer = (cardColorNumber == randomColorNumber) ? 'false' : 'true';
  var answerButton = '.answer-buttons .answer-button[data-answer="' + wrongAnswer + '"]';
  jQuery(answerButton).click();
}