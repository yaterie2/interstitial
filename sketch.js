let bg;
let sand;
let darkSand;
let biofilm;
let diatoms = [];
let ciliates = [];
let gastrotrichs = [];
let tardigrades = [];
let kinorhynchs = [];
let copepods = [];
let forams = [];
let organisms = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = new Background();
  biofilm = new Biofilm();
  sand = new Sand();
  darkSand = new DarkSand();

  let nematodeCount = 6;

  for (let i = 0; i < nematodeCount; i++) {
    organisms.push(
      new Nematode(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8)
      )
    );
  }

  for (let i = 0; i < 32; i++) {
    gastrotrichs.push(
      new Gastrotrich(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8)
      )
    );
  }

  for (let i = 0; i < 8; i++) {
    kinorhynchs.push(
      new Kinorhynch(
        random(width * 0.25, width * 0.75),
        random(height * 0.25, height * 0.75)
      )
    );
  }

  let copepods = [];

  for (let i = 0; i < 6; i++) {
    copepods.push(
      new Copepod(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8)
      )
    );
  }

  for (let i = 0; i < 28; i++) {
    ciliates.push(new Ciliate(random(width), random(height)));
  }

  for (let i = 0; i < 3; i++) {
    tardigrades.push(
      new Tardigrade(
        random(width * 0.3, width * 0.7),
        random(height * 0.3, height * 0.7)
      )
    );
  }

  for (let i = 0; i < 80; i++) {
    diatoms.push(
      new Diatom(
        random(width),
        random(height * 0.6) // bias toward upper sediment
      )
    );
  }


  for (let i = 0; i < 40; i++) {
    forams.push(new Foraminifera(random(width), random(height)));
  }


//   organisms.push(new Nematode(200, 200));
//   organisms.push(new Copepod(300, 300));
}

function draw() {
  bg.display();
  biofilm.display();

  for (let t of tardigrades) {
    t.update();
    t.display();
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

  sand.display();
  darkSand.display();

  for (let o of organisms) {
    o.update();
    o.display();
  }
}
