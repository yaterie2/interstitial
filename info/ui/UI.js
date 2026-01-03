let uiRoot;
let nameLabel;
let infoIcon;
let infoPanel;

function setupUI() {
  uiRoot = createDiv();
  uiRoot.id("organism-ui");

  nameLabel = createDiv("");
  nameLabel.id("organism-name");

  infoIcon = createDiv("ⓘ");
  infoIcon.id("info-icon");

  infoPanel = createDiv("");
  infoPanel.id("info-panel");

  uiRoot.child(nameLabel);
  uiRoot.child(infoIcon);

  infoIcon.mousePressed(() => {
    infoOpen = !infoOpen;
    infoPanel.style("display", infoOpen ? "block" : "none");
  });

  hideUI();
}

function updateUI(organism) {
  if (!organism || !organism.speciesName) {
    hideUI();
    return;
  }

  nameLabel.html(organism.speciesName);

  infoPanel.html(
    organism.infoText ?? "Detailed biological information will appear here."
  );

  uiRoot.style("opacity", "1");
  uiRoot.style("pointer-events", "auto");
}

function hideUI() {
  if (!uiRoot) return;

  infoOpen = false;

  uiRoot.style("opacity", "0");
  uiRoot.style("pointer-events", "none");

  if (infoPanel) {
    infoPanel.style("display", "none");
  }
}
