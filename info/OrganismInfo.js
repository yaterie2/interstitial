const OrganismInfo = {
  nematode: {
    name: "Nematodes (Roundworms)",
    role: "Nematodes dominate interstitial sediments by sheer abundance. They regulate bacterial populations, recycle nutrients, and maintain microbial turnover through constant grazing and movement.",
    remarkable:
      "They are the most abundant animals on Earth by number. Interstitial nematodes tolerate extreme salinity shifts, pollution, hypoxia, and physical disturbance, making them highly resilient ecosystem stabilizers.",
    relations: [
      "Graze on bacteria within biofilms (shared with diatoms and bacteria)",
      "Preyed upon by harpacticoid copepods",
      "Compete with gastrotrichs for microbial food resources",
      "Physically restructure sediment pores, indirectly benefiting ciliates and bacteria",
    ],
  },

  copepod: {
    name: "Harpacticoid Copepods",
    role: "Harpacticoid copepods connect microbial production to higher trophic levels by grazing on microalgae and meiofauna.",
    remarkable:
      "Despite their small size, they show complex, highly mobile behavior and navigate sediment as a three-dimensional environment rather than a flat surface.",
    relations: [
      "Graze on benthic diatoms",
      "Prey on nematodes and ciliates",
      "Compete with gastrotrichs for biofilm resources",
      "Serve as prey for larger predators outside the interstitial system",
    ],
  },

  diatom: {
    name: "Benthic Diatoms",
    role: "Benthic diatoms are primary producers that convert light and nutrients into organic matter, forming the energetic base of interstitial food webs.",
    remarkable:
      "Their silica cell walls form intricate microscopic architectures, and many species secrete sticky polymers that bind sediment grains together.",
    relations: [
      "Consumed by harpacticoid copepods",
      "Consumed by gastrotrichs",
      "Form biofilms together with bacteria",
      "Stabilize sediment structure used by nematodes and ciliates",
    ],
  },

  foraminifera: {
    name: "Foraminifera",
    role: "Foraminifera contribute to sediment formation and act as sensitive indicators of environmental conditions within coastal muds.",
    remarkable:
      "They construct mineral shells that record chemical conditions of their environment, leaving long-lasting geological and climatic records.",
    relations: [
      "Interact with bacteria and diatoms on sediment surfaces",
      "Compete weakly with ciliates for microbial food",
      "Contribute mineral particles to the surrounding sediment matrix",
    ],
  },

  ciliate: {
    name: "Ciliates",
    role: "Ciliates regulate bacterial populations and accelerate nutrient cycling by rapidly consuming and processing microbial biomass.",
    remarkable:
      "They move using coordinated cilia, generating micro-currents that alter chemical gradients in water-filled sediment pores.",
    relations: [
      "Feed primarily on bacteria within biofilms",
      "Preyed upon by harpacticoid copepods",
      "Influenced by sediment restructuring caused by nematodes",
    ],
  },

  gastrotrich: {
    name: "Gastrotrichs",
    role: "Gastrotrichs contribute to decomposition and nutrient turnover by grazing on bacteria, microalgae, and organic particles.",
    remarkable:
      "They glide between sand grains using cilia and adhesive tubes, allowing precise movement through extremely tight spaces.",
    relations: [
      "Graze on benthic diatoms",
      "Graze on bacteria within biofilms",
      "Compete with nematodes for microbial resources",
      "Occasionally preyed upon by copepods",
    ],
  },

  kinorhynch: {
    name: "Kinorhynchs (Mud Dragons)",
    role: "Kinorhynchs are specialist sediment dwellers that indicate structurally stable, oxygenated mud systems.",
    remarkable:
      "Their segmented, armored bodies and retractable spiny heads give them one of the most unusual morphologies among meiofauna.",
    relations: [
      "Feed on detritus and microorganisms within sediment",
      "Share habitat with nematodes and gastrotrichs without direct competition",
      "Sensitive to sediment disturbance caused by large bioturbators",
    ],
  },

  tardigrade: {
    name: "Tardigrades (Water Bears)",
    role: "Tardigrades are opportunistic feeders that consume algae, bacteria, and small interstitial animals.",
    remarkable:
      "They can enter cryptobiosis, surviving extreme dehydration, freezing, radiation, and long-term dormancy.",
    relations: [
      "Feed on diatoms and microbial biofilms",
      "Occasionally prey on nematodes and gastrotrichs",
      "Compete weakly with copepods for food resources",
    ],
  },

  oligochaete: {
    name: "Oligochaete Worms (Micro-annelids)",
    role: "Oligochaetes act as ecosystem engineers, mixing sediments and increasing oxygen penetration into deeper layers.",
    remarkable:
      "Their continuous burrowing reshapes sediment architecture, indirectly controlling microbial activity and chemical gradients.",
    relations: [
      "Consume detritus and microorganisms",
      "Increase oxygen availability for bacteria and ciliates",
      "Modify sediment structure affecting nematodes and kinorhynchs",
    ],
  },
};

// info/OrganismInfo.js

let infoColumn;
let infoPanel;
let infoVisible = false;

function setupOrganismInfo() {
  // --- PREVENT DUPLICATES ---
  if (infoColumn) return;

  // ---- COLUMN ----
  infoColumn = createDiv();
  infoColumn.id("info-column");
  infoColumn.parent(document.body);

  // ---- PANEL (CHILD OF COLUMN) ----
  infoPanel = createDiv();
  infoPanel.id("info-panel");

  infoColumn.child(infoPanel);

  hideOrganismInfo();
}

function toggleOrganismInfo(speciesId) {
  if (infoVisible) {
    hideOrganismInfo();
  } else {
    showOrganismInfo(speciesId);
  }
}

function showOrganismInfo(speciesId) {
  const data = OrganismInfo[speciesId];
  if (!data) return;

  infoPanel.html(`

    <section>
      <h3>Role</h3>
      <p>${data.role}</p>
    </section>

    <section>
      <h3>Why remarkable</h3>
      <p>${data.remarkable}</p>
    </section>

    <section>
      <h3>Ecological relations</h3>
      <ul>
        ${data.relations.map(r => `<li>${r}</li>`).join("")}
      </ul>
    </section>
  `);

  infoPanel.style("display", "block");
  infoVisible = true;
}

function hideOrganismInfo() {
  if (!infoPanel) return;
  infoPanel.style("display", "none");
  infoVisible = false;
}
