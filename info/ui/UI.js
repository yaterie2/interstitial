let uiRoot;
let nameLabel;
let infoIcon;

function setupUI() {
  uiRoot = createDiv();
  uiRoot.id("organism-ui");

  nameLabel = createDiv("");
  nameLabel.id("organism-name");

  infoIcon = createDiv("ⓘ");
  infoIcon.id("info-icon");

  uiRoot.child(nameLabel);
  uiRoot.child(infoIcon);

  infoIcon.mousePressed((event) => {
    event.stopPropagation();
    if (!selectedOrganism) return;
    toggleOrganismInfo(selectedOrganism.speciesId);

    if (hit) {
      selectedOrganism = hit;
      cam.targetZoom = 2.6;

      // 🔑 NEW: if info panel already open, update it
      if (infoVisible && selectedOrganism.speciesId) {
        showOrganismInfo(selectedOrganism.speciesId);
      }
    }
  });

  hideUI();
}

function updateUI(organism) {
  if (!organism || !organism.speciesName) {
    hideUI();
    return;
  }

  nameLabel.html(organism.speciesName);
  uiRoot.style("opacity", "1");
  uiRoot.style("pointer-events", "auto");

  if (infoVisible && organism?.speciesId) {
    showOrganismInfo(organism.speciesId);
  }
}

function hideUI() {
  if (!uiRoot) return;
  uiRoot.style("opacity", "0");
  uiRoot.style("pointer-events", "none");
}
