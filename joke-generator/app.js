// ! Started on Wednesday October 28, 2020 11:42AM as small js proj for msca

const jokeContainer = document.querySelector('.single-jokes-container');
const jokeBtn = document.querySelector('.jokeBtn');

async function getJoke() {
  let response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      accept: 'application/json',
    },
  });
  console.log(response);
  let jokeData = await response.json();
  //   let jokeData = await JSON.parse(response);

  console.log(jokeData);
  return jokeData;
}

async function renderJoke() {
  let jokeData = await getJoke();
  console.log(jokeData);
  let joke = document.createElement('li');
  joke.textContent = jokeData.joke;
  jokeContainer.appendChild(joke);
}

jokeBtn.addEventListener('click', renderJoke);
