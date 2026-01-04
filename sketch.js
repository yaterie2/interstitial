// ------------------------------------------------------------
// CAMERA SYSTEM
// ------------------------------------------------------------
let cam = {
  x: 0,
  y: 0,
  zoom: 1.15, // default zoom
  targetX: 0,
  targetY: 0,
  targetZoom: 1.15,
};

let selectedOrganism = null;
let infoOpen = false;

let eyeCursor;

function preload() {
  eyeCursor = loadImage("assets/cursor/eye.png");
}

// ------------------------------------------------------------
// WORLD LAYERS
// ------------------------------------------------------------
let bg;
let sand;
let darkSand;
let biofilm;

// ------------------------------------------------------------
// ORGANISM ARRAYS
// ------------------------------------------------------------
let diatoms = [];
let ciliates = [];
let gastrotrichs = [];
let tardigrades = [];
let kinorhynchs = [];
let oligochaetes = [];
let forams = [];
let nematodes = [];
let copepods = [];

// ------------------------------------------------------------
// SETUP
// ------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);

  // UI (DOM-based)
  setupUI();
  setupOrganismInfo();

  // --- BACKGROUND & SUBSTRATE ---
  bg = new Background();
  biofilm = new Biofilm();
  sand = new Sand();
  darkSand = new DarkSand();

  // --- ORGANISMS ---
  for (let i = 0; i < 12; i++)
    nematodes.push(new Nematode(random(width), random(height)));

  for (let i = 0; i < 7; i++)
    copepods.push(new Copepod(random(width), random(height)));

  for (let i = 0; i < 32; i++)
    gastrotrichs.push(new Gastrotrich(random(width), random(height)));

  for (let i = 0; i < 4; i++)
    oligochaetes.push(new Oligochaete(random(width), random(height)));

  for (let i = 0; i < 8; i++)
    kinorhynchs.push(new Kinorhynch(random(width), random(height)));

  for (let i = 0; i < 28; i++)
    ciliates.push(new Ciliate(random(width), random(height)));

  for (let i = 0; i < 3; i++)
    tardigrades.push(new Tardigrade(random(width), random(height)));

  for (let i = 0; i < 80; i++)
    diatoms.push(new Diatom(random(width), random(height)));

  for (let i = 0; i < 40; i++)
    forams.push(new Foraminifera(random(width), random(height)));

  // --- INITIAL CAMERA CENTER ---
  cam.x = width / 2;
  cam.y = height / 2;
  cam.targetX = cam.x;
  cam.targetY = cam.y;
}

// ------------------------------------------------------------
// DRAW
// ------------------------------------------------------------
function draw() {
  resetMatrix();
  pixelDensity(1);

  // ---------- SCREEN SPACE ----------
  bg.display();

  // ---------- CAMERA UPDATE ----------
  cam.x = lerp(cam.x, cam.targetX, 0.08);
  cam.y = lerp(cam.y, cam.targetY, 0.08);
  cam.zoom = lerp(cam.zoom, cam.targetZoom, 0.08);

  // ---------- WORLD SPACE ----------
  translate(width / 2, height / 2);
  scale(cam.zoom);
  translate(-cam.x, -cam.y);

  biofilm.display();

  for (let arr of [
    tardigrades,
    nematodes,
    copepods,
    diatoms,
    forams,
    kinorhynchs,
    ciliates,
    gastrotrichs,
    oligochaetes,
  ]) {
    for (let o of arr) {
      o.update();
      o.display();
    }
  }

  sand.display();
  darkSand.display();

  // ---------- FOLLOW SELECTED ----------
  if (selectedOrganism) {
    cam.targetX =
      selectedOrganism.camX ?? selectedOrganism.x ?? selectedOrganism.pos?.x;

    cam.targetY =
      selectedOrganism.camY ?? selectedOrganism.y ?? selectedOrganism.pos?.y;
  }

  // ---------- UI & CURSOR ----------
  updateUI(selectedOrganism);
  updateCursor();
}

// ------------------------------------------------------------
// CURSOR HANDLING (CSS-BASED, STABLE)
// ------------------------------------------------------------
function updateCursor() {
  let wx = (mouseX - width / 2) / cam.zoom + cam.x;
  let wy = (mouseY - height / 2) / cam.zoom + cam.y;

  let hit = findClosestOrganism(wx, wy, 20 / cam.zoom);

  if (hit && eyeCursor) {
    cursor(eyeCursor, eyeCursor.width / 2, eyeCursor.height / 2);
  } else {
    cursor("default");
  }
}

// ------------------------------------------------------------
// MOUSE INTERACTION
// ------------------------------------------------------------
function mousePressed() {
  let wx = (mouseX - width / 2) / cam.zoom + cam.x;
  let wy = (mouseY - height / 2) / cam.zoom + cam.y;

  let hit = findClosestOrganism(wx, wy, 20);

  if (hit) {
    selectedOrganism = hit;
    cam.targetZoom = 2.6;
  } else {
    selectedOrganism = null;
    cam.targetZoom = 1.15;
    cam.targetX = width / 2;
    cam.targetY = height / 2;
    hideOrganismInfo();
    hideUI();
  }
}

// ------------------------------------------------------------
// ORGANISM PICKING
// ------------------------------------------------------------
function findClosestOrganism(x, y, radius) {
  let closest = null;
  let minDist = radius;

  let all = [
    ...nematodes,
    ...copepods,
    ...tardigrades,
    ...kinorhynchs,
    ...forams,
    ...diatoms,
    ...ciliates,
    ...gastrotrichs,
    ...oligochaetes,
  ];

  for (let o of all) {
    let ox = o.hitX ?? o.x ?? o.pos?.x;
    let oy = o.hitY ?? o.y ?? o.pos?.y;
    if (ox == null || oy == null) continue;

    let d = dist(x, y, ox, oy);
    if (d < minDist) {
      minDist = d;
      closest = o;
    }
  }
  return closest;
}
