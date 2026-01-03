let bg;
let sand;
let darkSand;
let biofilm;

let diatoms = [];
let ciliates = [];
let gastrotrichs = [];
let tardigrades = [];
let kinorhynchs = [];
let oligochaetes = [];
let forams = [];
let nematodes = [];
let copepods = [];

function lerpAngle(a, b, t) {
  let diff = ((b - a + PI) % TWO_PI) - PI;
  return a + diff * t;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

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
}

function draw() {
  bg.display();
  biofilm.display();

  for (let t of tardigrades) t.update(), t.display();
  for (let n of nematodes) n.update(), n.display();
  for (let c of copepods) c.update(), c.display();
  for (let d of diatoms) d.update(), d.display();
  for (let f of forams) f.update(), f.display();
  for (let o of oligochaetes) o.update(), o.display();
  for (let k of kinorhynchs) k.update(), k.display();
  for (let c of ciliates) c.update(), c.display();
  for (let g of gastrotrichs) g.update(), g.display();

  sand.display();
  darkSand.display();
}
