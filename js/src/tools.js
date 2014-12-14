/**
 * console.log
 * @param txt
 */
 function clog(txt) {
  console.log(txt);
 }

/**
 * var dump
 * @param obj
 */
function vardump(obj) {
 console.log(JSON.stringify(obj));
}

/**
 * Info log
 * @param txt
 */
function info(txt) {
 console.log("Info: "+ txt);
}

/**
 * Error log
 * @param txt
 */
function error(txt) {
 console.log("Error: "+ txt);
}

/**
 * Get random color
 * @returns {number}
 */
function getRandomColor() {
 return (Math.floor(Math.random() * 4) + 1);
}

/**
 * Show answer result box
 * @param theAnswerIsCorrect
 */
function showAnswerResultBox(theAnswerIsCorrect) {
 jQuery("#correct-answer").find("span.glyphicon").removeClass("true").removeClass("false").addClass(theAnswerIsCorrect.toString());
 jQuery("#correct-answer").find("span.glyphicon").fadeIn().delay(500).fadeOut();
}
