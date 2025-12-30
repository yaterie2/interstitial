class Tardigrade {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = random(10, 16); // microscopic scale
    this.speed = random(0.15, 0.35);

    this.dir = random(TWO_PI);
    this.wiggle = random(1000);

    this.legPhase = random(TWO_PI);
  }

  update() {
    // slow random crawling
    this.wiggle += 0.01;
    this.dir += map(noise(this.wiggle), 0, 1, -0.02, 0.02);

    this.x += cos(this.dir) * this.speed;
    this.y += sin(this.dir) * this.speed;

    this.legPhase += 0.08;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.dir);

    noStroke();

    // BODY SEGMENTS
    let segments = 4;
    for (let i = 0; i < segments; i++) {
      let t = i / (segments - 1);
      let w = lerp(this.size * 1.2, this.size * 0.8, t);
      let h = lerp(this.size * 0.9, this.size * 0.6, t);

      fill(185, 175, 165, 220);
      ellipse(i * this.size * 0.6, 0, w, h);
    }

    // LEGS (8 total)
    for (let side of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        let x = i * this.size * 0.6;
        let y = side * this.size * 0.35;

        let lift = sin(this.legPhase + i * 0.6 + side) * 2;

        stroke(150, 140, 130, 200);
        strokeWeight(1);
        line(x, y, x + 2, y + lift);
      }
    }

    pop();
  }
}
