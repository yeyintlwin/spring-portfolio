(function () {
  "use strict";

  if (window.matchMedia("(pointer: coarse)").matches) return;

  const dot = document.createElement("div");
  dot.classList.add("cursor-dot");

  const ring = document.createElement("div");
  ring.classList.add("cursor-ring");

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const hoverTargets = "a, button, .btn, .lang-select, .theme-switcher, .img-hover-zoom";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add("hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove("hover");
    }
  });

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "0.5";
  });

  function animate() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;

    requestAnimationFrame(animate);
  }

  animate();
})();
