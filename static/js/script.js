const LIGHT_MODE = 'light-theme';
var options = {
  strings: ['Love ❤️ to contribute Open Source', 'Passionate to learn New Skills', 'Love to Travel Adventures places'],
  typeSpeed: 100,
  backSpeed: 20,
  loop: true,
};

var typed = new Typed('.typed-out-word', options);

function setMode() {
  document.body.classList.toggle(LIGHT_MODE);
}

document.addEventListener('DOMContentLoaded', () => {
  const parentElement = document.getElementById("Home");
  parentElement.style.height = (window.innerHeight - 87) + "px";
});
