/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';




async function getData(url) {
  return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

async function get_individual(num, all_numbers) {
  
  const result1 = await getData(`http://numbersapi.com/${num}?json`);
  const result2 = await getData(`http://numbersapi.com/${num - 1}?json`);
  const result3 = await getData(`http://numbersapi.com/${num + 1}?json`);

  
  const results = [result1, result2, result3];

  
  displayResults(results, num, all_numbers, true);
}

async function get_batch(num, all_numbers) {
  try {
    const result = await getData(`http://numbersapi.com/${num - 1}..${num + 1}?json`);
    
    const results = Object.entries(result).map(([key, value]) => {
      return {
        number: key,
        text: value
      };
    });

    
    displayResults(results, num, all_numbers, false);
  } catch (error) {
    console.error(error);
  }
}


function displayResults(results, num, all_numbers, shouldSort) {
  if (shouldSort) {
    results.sort((a, b) => parseInt(a.number) - parseInt(b.number));
  }

  

  results.forEach(result => {
    const infoDiv = document.createElement('div');
    const numDiv = document.createElement('div');
    numDiv.textContent = ` ${result.number}`;

    const triviaDiv = document.createElement('div');
    triviaDiv.textContent = ` ${result.text}`;

    infoDiv.appendChild(numDiv);
    infoDiv.appendChild(triviaDiv);
    all_numbers.appendChild(infoDiv);
  });

  
}

async function clickedon() {
  const num = parseInt(document.querySelector('#number').value);
  const all_numbers = document.querySelector('#number_info');

  all_numbers.innerHTML = '';

  if (document.querySelector('#batch').checked) {
    await get_batch(num, all_numbers);
  } else {
    await get_individual(num, all_numbers);
  }
}

