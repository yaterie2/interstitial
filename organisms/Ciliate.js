// Ciliate.js
// ------------------------------------------------------------
// Benthic ciliates (Euplotes-like)
// Flattened walkers of biofilms and sand grains
// Create micro-currents through jittery ciliary motion
// ------------------------------------------------------------

class Ciliate {
  constructor(x, y) {
    this.speciesName = "Ciliate";

    // optional but recommended
    this.speciesId = "ciliate";
    this.x = x;
    this.y = y;

    this.scale = random(0.6, 1.0); // smaller than tardigrades
    this.angle = random(TWO_PI);

    this.speed = random(0.15, 0.35);
    this.turnRate = random(0.02, 0.06);

    this.pauseTimer = random(60, 180);

    // body proportions
    this.w = random(6, 10) * this.scale;
    this.h = random(4, 7) * this.scale;

    // color: translucent grey–beige
    this.col = color(random(190, 215), random(185, 210), random(170, 195), 190);

    this.ciliaPhase = random(TWO_PI);
  }

  update() {
    this.pauseTimer--;

    if (this.pauseTimer > 0) {
      // slight rotation while feeding
      this.angle += sin(frameCount * 0.03) * 0.002;
      return;
    }

    // movement burst
    this.angle += random(-this.turnRate, this.turnRate);
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    // reset pause
    if (random() < 0.01) {
      this.pauseTimer = random(80, 220);
    }

    this.ciliaPhase += 0.15;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();

    // ---- BODY ----
    fill(this.col);
    ellipse(0, 0, this.w, this.h);

    // subtle edge highlight for visibility
    noFill();
    stroke(255, 245, 220, 45);
    strokeWeight(0.4);
    ellipse(0, 0, this.w * 1.05, this.h * 1.05);

    let steps = 10;
    for (let i = 0; i < steps; i++) {
      let a = map(i, 0, steps, 0, TWO_PI);
      let jitter = sin(this.ciliaPhase + a * 4) * 0.6;

      let rx = (this.w / 2) * cos(a);
      let ry = (this.h / 2) * sin(a);

      line(rx, ry, rx + cos(a) * jitter, ry + sin(a) * jitter);
    }

    pop();
  }
}
