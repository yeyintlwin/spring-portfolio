const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

const getCookie = (name) => {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) return cookieValue;
  }
  return null;
};

// Theme
const themeSwitcher = document.getElementById("themeSwitcher");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

const toggleTheme = () => {
  if (!themeIcon) return;
  const isDark = body.classList.toggle("dark-theme");
  themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
  setCookie("theme", isDark ? "dark" : "light", 30);
};

const loadThemeFromCookie = () => {
  if (!themeIcon) return;
  const savedTheme = getCookie("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeIcon.textContent = "light_mode";
  } else {
    body.classList.remove("dark-theme");
    themeIcon.textContent = "dark_mode";
  }
};

loadThemeFromCookie();

if (themeSwitcher && themeIcon) {
  themeSwitcher.addEventListener("click", toggleTheme);
  themeSwitcher.addEventListener("touchstart", (event) => {
    event.preventDefault();
    toggleTheme();
  });
}

// Active nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

if (sections.length && navLinks.length) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Scroll fade-in animation via IntersectionObserver
const fadeEls = document.querySelectorAll(".fade-in");
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach((el) => observer.observe(el));
}
