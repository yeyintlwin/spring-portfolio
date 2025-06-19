// Function to set a cookie
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

// Function to get a cookie value
const getCookie = (name) => {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) return cookieValue;
  }
  return null;
};

// start: theme-function
const themeSwitcher = document.getElementById("themeSwitcher");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

const toggleTheme = () => {
  const isDark = body.classList.toggle("dark-theme");
  themeIcon.textContent = isDark ? "light_mode" : "dark_mode";

  // Save theme preference to cookie
  setCookie("theme", isDark ? "dark" : "light", 30); // Expires in 30 days
};

// Function to load theme from cookie
const loadThemeFromCookie = () => {
  const savedTheme = getCookie("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeIcon.textContent = "light_mode";
  } else {
    body.classList.remove("dark-theme");
    themeIcon.textContent = "dark_mode";
  }
};

// Load theme on page load
loadThemeFromCookie();

themeSwitcher.addEventListener("click", toggleTheme);
themeSwitcher.addEventListener("touchstart", (event) => {
  event.preventDefault(); // Prevent default touch behavior
  toggleTheme();
});
// end: theme-function

// start: menu item highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

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
// end: menu item highlight
