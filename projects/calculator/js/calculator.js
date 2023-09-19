/* jshint esversion: 8 */
/* jshint browser: true */
'use strict';

var outputScreen;
var clearOnEntry;

var expression= "";



/**
 * Display a digit on the `outputScreen`
 * 
 * @param {number} digit digit to add or display on the `outputScreen`
 */
function enterDigit(digit) {
    if (clearOnEntry) {
        outputScreen.textContent = "";
        clearOnEntry = false;
    }
    
    
    outputScreen.textContent += digit;
    expression += digit;
}
/**
 * Clear `outputScreen` and set value to 0
 */
function clear_screen(resetExpression = true) {
    outputScreen.textContent = "0";
    clearOnEntry = true;
    if (resetExpression) {
        expression = "";
    }
}

/**
 * Evaluate the expression and display its result or *ERROR*
 */
function eval_expr() {
    try {
        const result = eval(expression);
        if (result !== undefined) {
            outputScreen.textContent = result;
            clearOnEntry = true;
            expression = result.toString();
        } else {
            outputScreen.textContent = "0"; 
            clearOnEntry = true;
            expression = "";
        }
    } catch (error) {
        outputScreen.textContent = "ERROR";
        clearOnEntry = true;
        expression = "";
    }
}


/**
 * Display an operation on the `outputScreen`
 * 
 * @param {string} operation to add to the expression
 */
function enterOp(operation) {
    if (clearOnEntry) {
        clearOnEntry = false;
    } else {
        outputScreen.textContent += operation;
        expression += operation;
    }
}




window.onload = function () {
    outputScreen = document.querySelector("#result");
    clearOnEntry = true;
    outputScreen.textContent = "0";
};

