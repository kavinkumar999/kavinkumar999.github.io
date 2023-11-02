const sections = document.querySelectorAll(".hidden");

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
};

const observer = new IntersectionObserver(callback);

sections.forEach((section) => {
  observer.observe(section);
});