// Foraminifera.js
// ------------------------------------------------------------
// Benthic foraminifera (downsized, high rim contrast)
// Dark organic-rich cores, bright calcite rims
// ------------------------------------------------------------

class Foraminifera {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // 🔴 MASSIVE DOWNSCALING
    this.scale = random(0.65, 0.95);
    this.rotation = random(TWO_PI);

    this.chambers = [];
    this.numChambers = floor(random(5, 9));

    this.pseudoPhase = random(TWO_PI);
    this.pseudoCount = floor(random(2, 4));

    this.generateShell();
  }

  generateShell() {
    let angle = random(TWO_PI);

    // 🔴 MUCH smaller initial radius
    let r = random(1.1, 1.5) * this.scale;

    // dark brown carbonate base
    let t = random();
    if (t < 0.33) this.baseCol = color(135, 105, 70);
    else if (t < 0.66) this.baseCol = color(145, 115, 80);
    else this.baseCol = color(125, 95, 65);

    for (let i = 0; i < this.numChambers; i++) {
      let nt = i / (this.numChambers - 1);

      let px = cos(angle) * r;
      let py = sin(angle) * r;

      // axial convergence (kept)
      if (nt > 0.65) {
        let k = map(nt, 0.65, 1.0, 1.0, 0.03, true);
        px *= k;
        py *= k;
      }

      this.chambers.push({
        x: px,
        y: py,

        // 🔴 smaller chambers
        r: r * random(0.45, 0.6),

        // very dark cores, very bright rims
        coreDark: random(70, 95),
        rimBright: random(60, 85),
      });

      angle += random(0.85, 1.15);
      r *= random(1.12, 1.18);
    }
  }

  update() {
    this.rotation += 0.0002;
    this.pseudoPhase += 0.004;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    noStroke();

    // ---- SHELL CHAMBERS ----
    for (let c of this.chambers) {
      let steps = 5;

      for (let i = 0; i < steps; i++) {
        let t = i / (steps - 1);

        // DARK CORE → BRIGHT RIM (high contrast)
        let shade = lerp(-c.coreDark, c.rimBright, t);

        fill(
          constrain(red(this.baseCol) + shade, 0, 255),
          constrain(green(this.baseCol) + shade, 0, 255),
          constrain(blue(this.baseCol) + shade, 0, 255),
          235
        );

        ellipse(c.x, c.y, c.r * 2 * t, c.r * 2 * t);
      }
    }

    // ---- PSEUDOPODIA (barely visible) ----
    stroke(210, 195, 165, 25);
    strokeWeight(0.25);

    for (let i = 0; i < this.pseudoCount; i++) {
      let a = map(i, 0, this.pseudoCount, 0, TWO_PI);
      let len = 3.5 + sin(this.pseudoPhase + i) * 0.8;
      line(0, 0, cos(a) * len, sin(a) * len);
    }

    pop();
  }
}
