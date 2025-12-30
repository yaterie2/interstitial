console.log("Organism loaded");

class Organism {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.size = 10;
  }

  update() {
    this.pos.add(this.vel);
  }

  display() {
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
