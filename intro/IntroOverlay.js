// intro/IntroOverlay.js

let introOverlay;
let introVisible = true;

function setupIntroOverlay() {
  if (introOverlay) return;

  introOverlay = createDiv();
  introOverlay.id("intro-overlay");

  introOverlay.html(`
    <div class="intro-panel">
      <h1>Hidden Life</h1>

      <p class="intro-subtitle">
        An interactive exploration of microscopic life in coastal mud and sand.
      </p>

      <p class="intro-instruction">
        Click on organisms to zoom in, follow them, and discover their ecological roles.
      </p>

      <button class="intro-button">Start</button>
    </div>


  `);

  introOverlay.parent(document.body);

  // button logic
  const btn = introOverlay.elt.querySelector(".intro-button");
  btn.addEventListener("click", () => {
    hideIntroOverlay();
  });
}

function hideIntroOverlay() {
  if (!introOverlay) return;

  introOverlay.class("intro-hide");
  introVisible = false;

  // remove from DOM after fade
  setTimeout(() => {
    introOverlay.remove();
    introOverlay = null;
  }, 400);
}
