// animation navbar
window.addEventListener("load", function () {
  const links = [...document.querySelectorAll(".menu-link")];
  links.forEach((item) => item.addEventListener("mouseenter", handleHoverLink));
  const line = document.createElement("div");
  line.className = "line-effect";
  document.body.appendChild(line);
  function handleHoverLink(event) {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const offsetBottom = 0;
    line.style.width = `${width}px`;
    line.style.left = `${left}px`;
    line.style.top = `${top + height + offsetBottom}px`;
  }

  const menu = document.querySelector(".menu");
  menu.addEventListener("mouseleave", function () {
    line.style.width = 0;
  });
});

//Dark mode
let dark = document.getElementById("dark");

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light");
}

// localStorage.setItem("theme", "light");
let localData = localStorage.getItem("theme");

if (localData == "light") {
  dark.src = "/assets/image/moon.png";
  document.body.classList.remove("dark-theme");
} else if (localData == "dark") {
  dark.src = "/assets/image/sun.png";
  document.body.classList.add("dark-theme");
}

dark.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    dark.src = "/assets/image/sun.png";
    localStorage.setItem("theme", "dark");
  } else {
    dark.src = "/assets/image/moon.png";
    localStorage.setItem("theme", "light");
  }
};
