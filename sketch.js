// ------------------------------------------------------------
// CAMERA SYSTEM
// ------------------------------------------------------------
let cam = {
  x: 0,
  y: 0,
  zoom: 1,
  targetX: 0,
  targetY: 0,
  targetZoom: 1,
};

let selectedOrganism = null;

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

  // --- BACKGROUND & SUBSTRATE ---
  bg = new Background();
  biofilm = new Biofilm();
  sand = new Sand();
  darkSand = new DarkSand();

  // --- NEMATODES ---
  for (let i = 0; i < 12; i++) {
    nematodes.push(
      new Nematode(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8)
      )
    );
  }

  // --- COPEPODS ---
  for (let i = 0; i < 7; i++) {
    copepods.push(
      new Copepod(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8)
      )
    );
  }

  // --- GASTROTRICHS ---
  for (let i = 0; i < 32; i++) {
    gastrotrichs.push(
      new Gastrotrich(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8)
      )
    );
  }

  // --- OLIGOCHAETES ---
  for (let i = 0; i < 4; i++) {
    oligochaetes.push(
      new Oligochaete(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8)
      )
    );
  }

  // --- KINORHYNCHS ---
  for (let i = 0; i < 8; i++) {
    kinorhynchs.push(
      new Kinorhynch(
        random(width * 0.25, width * 0.75),
        random(height * 0.25, height * 0.75)
      )
    );
  }

  // --- CILIATES ---
  for (let i = 0; i < 28; i++) {
    ciliates.push(new Ciliate(random(width), random(height)));
  }

  // --- TARDIGRADES ---
  for (let i = 0; i < 3; i++) {
    tardigrades.push(
      new Tardigrade(
        random(width * 0.3, width * 0.7),
        random(height * 0.3, height * 0.7)
      )
    );
  }

  // --- DIATOMS ---
  for (let i = 0; i < 80; i++) {
    diatoms.push(new Diatom(random(width), random(height * 0.6)));
  }

  // --- FORAMINIFERA ---
  for (let i = 0; i < 40; i++) {
    forams.push(new Foraminifera(random(width), random(height)));
  }

  // --- INITIAL CAMERA CENTER ---
  cam.x = width / 2;
  cam.y = height / 2;
  cam.targetX = cam.x;
  cam.targetY = cam.y;
  cam.zoom = 1;
  cam.targetZoom = 1;
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

  for (let t of tardigrades) {
    t.update();
    t.display();
  }
  for (let n of nematodes) {
    n.update();
    n.display();
  }
  for (let c of copepods) {
    c.update();
    c.display();
  }
  for (let d of diatoms) {
    d.update();
    d.display();
  }
  for (let f of forams) {
    f.update();
    f.display();
  }
  for (let k of kinorhynchs) {
    k.update();
    k.display();
  }
  for (let c of ciliates) {
    c.update();
    c.display();
  }
  for (let g of gastrotrichs) {
    g.update();
    g.display();
  }
  for (let o of oligochaetes) {
    o.update();
    o.display();
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
    cam.targetZoom = 3.0;
  } else {
    selectedOrganism = null;
    cam.targetZoom = 1.0;
    cam.targetX = width / 2;
    cam.targetY = height / 2;
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
