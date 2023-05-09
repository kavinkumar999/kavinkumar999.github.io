const LIGHT_MODE = 'light-theme';
var options = {
  strings: ['I love to automate everything ♡︎', 'I love to play with Numbers ⭐', 'I love to explore new innovations ⚡'],
  typeSpeed: 100,
  backSpeed: 20,
  loop: true,
};

var typed = new Typed('.typed-out-word', options);

function setMode() {
  document.body.classList.toggle(LIGHT_MODE);
  isLightMode = document.body.classList.contains(LIGHT_MODE);
  if(isLightMode) {
    window.localStorage.setItem("theme", "light-theme");
  } else {
    window.localStorage.setItem("theme", "dark-theme");
  }
}
