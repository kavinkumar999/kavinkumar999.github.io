const LIGHT_MODE = 'light-theme';
var options = {
  strings: ['Love ♥ to contribute Open Source', 'Passionate to learn New Skills', 'Love to Travel Adventures places'],
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
