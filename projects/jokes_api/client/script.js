'use strict;'
document.addEventListener("DOMContentLoaded", function() {
 
    async function getJokes() {
        let category = document.getElementById('category').value;
        let language = document.getElementById('language').value;
        let number = document.getElementById('number').value;
        let jokesArea = document.getElementById('jokesArea');

        let apiUrl = `https://sabina2002.pythonanywhere.com/api/v1/jokes?category=${category}&language=${language}&number=${number}`;

        try {
            let response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            jokesArea.innerHTML = ''; 
            data.forEach(joke => {
                jokesArea.innerHTML += `<p>${joke.joke}</p>`; 
            });
            
        } catch (error) {
            console.error('Error fetching jokes:', error);
            jokesArea.innerHTML = `<p>Error fetching jokes</p>`;
        }
    }

  
    async function getSpecificJoke() {
        let category = document.getElementById('category').value;
        let language = document.getElementById('language').value;
        let jokeId = document.getElementById('jokeId').value;
        let jokesArea = document.getElementById('jokesArea');

        let apiUrl = `https://sabina2002.pythonanywhere.com/api/v1/jokes/${language}/${category}/${jokeId}`;

        try {
            let response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            jokesArea.innerHTML = `<p>${data.joke}</p>`; 
        } catch (error) {
            console.error('Error fetching the specific joke:', error);
            jokesArea.innerHTML = `<p>Joke not found </p>`;
        }
    }

   
    document.getElementById('getJokes').addEventListener('click', getJokes);
    document.getElementById('getJoke').addEventListener('click', getSpecificJoke);
});
