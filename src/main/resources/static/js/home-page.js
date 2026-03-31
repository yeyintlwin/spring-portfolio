/**
 * Home page only: language form submit.
 */
(function () {
  "use strict";

  const langSelect = document.getElementById("lang");
  if (langSelect && langSelect.form) {
    langSelect.addEventListener("change", () => {
      langSelect.form.submit();
    });
  }
})();
