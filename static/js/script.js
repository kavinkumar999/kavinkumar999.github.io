const DARK_MODE = 'dark-theme';
const LIGHT_MODE = 'light-theme';
var url = window.location.host;
var options = {
  strings: ['Love ❤️ to contribute Open Source', 'Passionate to learn New Skills', 'Love to Travel Adventures places'],
  typeSpeed: 100,
  backSpeed: 20,
  loop: true,
};

var typed = new Typed('.typed-out-word', options);

function setMode() {
  isDarkTheme = document.body.classList.contains('dark-theme');
  let url = window.location.host;
  if(isDarkTheme) {
    document.body.classList.add(LIGHT_MODE);
    document.body.classList.remove(DARK_MODE);
    document.getElementById("theme").src = `//${url}/png/moon.png`;
  } else {
    document.body.classList.add(DARK_MODE);
    document.body.classList.remove(LIGHT_MODE);
    document.getElementById("theme").src = `//${url}/png/sun.png`;
  }
}
