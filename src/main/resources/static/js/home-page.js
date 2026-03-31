/**
 * Home page only: mobile viewport unit (--vh) and language form submit.
 */
(function () {
  "use strict";

  const root = document.documentElement;

  const setViewportHeightUnit = () => {
    root.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  };

  setViewportHeightUnit();
  window.addEventListener("resize", setViewportHeightUnit);

  const langSelect = document.getElementById("lang");
  if (langSelect && langSelect.form) {
    langSelect.addEventListener("change", () => {
      langSelect.form.submit();
    });
  }
})();
