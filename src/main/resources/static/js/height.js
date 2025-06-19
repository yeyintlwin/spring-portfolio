// start: section height - browser zoom

function getTotalHeight(parentElement) {
  let totalHeight = 0;

  const parentStyles = window.getComputedStyle(parentElement);
  totalHeight += parseInt(parentStyles.paddingTop);
  totalHeight += parseInt(parentStyles.paddingBottom);

  const children = parentElement.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const childStyles = window.getComputedStyle(child);

    const rect = child.getBoundingClientRect();

    totalHeight += rect.height;
    totalHeight += parseInt(childStyles.marginTop);
    totalHeight += parseInt(childStyles.marginBottom);
  }

  return totalHeight;
}

function updateSectionHeight() {
  const zoomFactor = window.devicePixelRatio; // Get the zoom level
  const viewportHeight = window.innerHeight; // Get the viewport height

  sections.forEach((section) => {
    let newHeight = 0;

    if (zoomFactor <= 1) {
      newHeight = Math.max(
        getTotalHeight(section),
        viewportHeight * zoomFactor
      );
    } else {
      newHeight = Math.max(getTotalHeight(section), viewportHeight);
    }

    // newHeight -= 60; // fix for the navbar height
    /*
      if (
        section.classList.contains("section-contact") &&
        getTotalHeight(document.querySelector(".section-contact")) + 150 <
          viewportHeight
      ) {
        newHeight -= 150;
      }
      */
    section.style.minHeight = `${newHeight}px`;
  });
}

// Initial update on page load
updateSectionHeight();

// Update section height on window resize or zoom change
window.addEventListener("resize", updateSectionHeight);
// end: section height - browser zoom
