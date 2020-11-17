const themeToggle = document.querySelector('#theme-toggle');
const toggleHeader = document.querySelector('#toggle-header');

function toggleTheme() {
  let root = document.documentElement;
  if (themeToggle.checked) {
    document.body.classList.add('light');
    toggleHeader.innerText = 'Ah, you walk in the light!';
  } else {
    document.body.classList.remove('light');
    toggleHeader.innerText = 'Welcome to the Dark Side...';
  }
}

themeToggle.addEventListener('click', toggleTheme);
