var defaultLanguage = 'en';
var language = window.navigator.userLanguage || window.navigator.language;
language = (_.isUndefined(language) ) ?  defaultLanguage : language;

var I18n = i18n[language];
I18n = (_.isUndefined(I18n)) ? i18n[defaultLanguage] : I18n;

var colorsMap = {
    1:     {"name": "red", "css": "red"},
    2:     {"name": "blue", "css": "blue"},
    3:     {"name": "yellow", "css": "yellow"},
    4:     {"name": "black", "css": "black"}
};


var pointsForAGoodAnswer = 100;