let bg;
let sand;
let darkSand;
let biofilm;
let tardigrades = [];
let copepods = [];
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

  let copepods = [];

  for (let i = 0; i < 6; i++) {
    copepods.push(
      new Copepod(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8)
      )
    );
  }

  for (let i = 0; i < 3; i++) {
    tardigrades.push(
      new Tardigrade(
        random(width * 0.3, width * 0.7),
        random(height * 0.3, height * 0.7)
      )
    );
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

  sand.display();
  darkSand.display();

  for (let o of organisms) {
    o.update();
    o.display();
  }
}
