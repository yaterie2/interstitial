// intro/IntroOverlay.js

let introOverlay;
let introVisible = true;

function setupIntroOverlay() {
  introOverlay = createDiv();
  introOverlay.id("intro-overlay");

  introOverlay.html(`
    <div class="intro-panel">
      <h1>Hidden Life</h1>

      <p class="intro-subtitle">
        An interactive exploration of interstitial organisms living between sand grains.
      </p>

      <p class="intro-instruction">
        Click on organisms to zoom in, follow their movement, and learn about their ecological roles.
      </p>

      <button id="intro-start-btn">Dive in</button>
    </div>

    <div class="intro-link">
    yannick-schwab.de
  <a href="https://www.yannick-schwab.de" target="_blank" rel="noopener">
  </a>
</div>

    <div class="intro-credit">
      A Design Studio Project by Yannick Schwab
    </div>
  `);

  introOverlay.parent(document.body);

  select("#intro-start-btn").mousePressed(hideIntroOverlay);
}

function hideIntroOverlay() {
  if (!introOverlay) return;

  introOverlay.addClass("intro-hidden");

  setTimeout(() => {
    introOverlay.remove();
    introVisible = false;
  }, 400);
}
