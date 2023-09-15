/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
//'use strict';


/**
 * Greet user by name
 * 
 * @param {string} name visitor's name
 * @param {string} selector element to use for display
 */
function greet(name, selector) {


    const greetElement=document.querySelector(selector);

    if (name){
        greetElement.innerHTML= `Hello <b>${name}</b>`;
    } 
}


/**
 * Check if a number is prime
 * 
 * @param {number} number number to check
 * @return {boolean} result of the check
 */
function isPrime(number) {
    if (number <= 1)
      return false;
  
    if (number <= 3)
      return true;
  
    if (number % 2 == 0 || number % 3 == 0)
      return false;
  
    for (let i = 5; i * i <= number; i = i + 6) {
      if (number % i == 0 || number % (i + 2) == 0)
        return false;
    }
  
    return true;
  }


/**
 * Print whether a number is prime
 * 
 * @param {number} number number to check
 * @param {string} selector element to use for display
 */
function printNumberInfo(number, selector) {

    let result = isPrime(number) ? " is a prime number" : "is not a prime number";

    document.querySelector(selector).textContent= number + " " + result ;
}


/**
 * Generate an array of prime numbers
 * 
 * @param {number} number number of primes to generate
 * @return {number[]} an array of `number` prime numbers
 */
function getNPrimes(number) {

    const listPrimes=[];

    let num= 2;
    while (listPrimes.length<number){
        if (isPrime(num)){
            listPrimes.push(num);

        }
        num++;
    }
    return listPrimes;

}

/**
 * Print a table of prime numbers
 * 
 * @param {number} number number of primes to display
 * @param {string} selector element to use for display
 */
function printNPrimes(number, selector) {

    const primes = getNPrimes(number);
    const tableElement = document.querySelector(selector);
    const tbody = tableElement.querySelector('tbody');
    tbody.innerHTML = '';
    

    if (primes.length > 0) {
        for (const prime of primes) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = prime.toString();
            row.appendChild(cell);
            tbody.appendChild(row);
        }
    }
            

}


/**
 * Display warning about missing URL query parameters
 * 
 * @param {Object} urlParams URL parameters
 * @param {string} selector element to use for display
 */
function displayWarnings(urlParams, selector) {

    const warningElement= document.querySelector(selector);

    const name = urlParams.get("name");
    const number = urlParams.get("number");

    if (name === null && number === null ){
        warningElement.textContent = 'Warning: Missing URL query parameters';
    }else if ( name=== null && number!== null){
        warningElement.textContent='Name is missing '
    } else if (name!==null && number ===null){
        warningElement.textContent="Number is missing"
    }
    else {
        warningElement.textContent=' '
    }
    

}

window.onload = function () {
    // TODO: Initialize the following variables
    let urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get("name") || "student";
    let number = parseInt(urlParams.get("number")) || 330;
    this.displayWarnings(urlParams, "#warnings");
    greet(name, "#greeting");
    printNumberInfo(number, "#numberInfo");
    printNPrimes(number, "table#nPrimes");
};
