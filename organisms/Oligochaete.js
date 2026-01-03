// Oligochaete.js
// ------------------------------------------------------------
// Micro-annelid (oligochaete worm)
// Slow peristaltic sediment mixer
// Bioturbation-oriented, infrastructural organism
// ------------------------------------------------------------

class Oligochaete {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // ---- BODY ----
    this.scale = random(0.7, 1.1);
    this.length = random(26, 36) * this.scale;
    this.width = random(3.8, 5.2) * this.scale;
    this.segments = floor(random(14, 18));

    // ---- ORIENTATION ----
    this.angle = random(TWO_PI);

    // ---- MOTION ----
    this.phase = random(TWO_PI);
    this.speed = random(0.12, 0.22); // very slow
    this.turnNoise = random(1000);

    // ---- COLOR (hemoglobin-rich tissue) ----
    this.baseCol = color(
      random(165, 185),
      random(105, 120),
      random(95, 110),
      210
    );
  }

  // ----------------------------------------------------------
  update() {
    // slow peristaltic wave
    this.phase += 0.04;

    // subtle directional drift
    this.turnNoise += 0.004;
    this.angle += map(noise(this.turnNoise), 0, 1, -0.015, 0.015);

    // net movement (very slow)
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // ----------------------------------------------------------
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    rectMode(CENTER);

    // ---- BODY SEGMENTS ----
    for (let i = 0; i < this.segments; i++) {
      let t = i / (this.segments - 1);

      // axial position
      let px = map(t, 0, 1, -this.length / 2, this.length / 2);

      // peristaltic contraction band
      let wave = sin(this.phase - t * TWO_PI * 1.6) * 0.5 + 0.5;

      let w = lerp(this.width * 0.85, this.width * 1.25, wave);

      // subtle thickness taper
      w *= lerp(0.9, 1.05, sin(t * PI));

      // gentle lateral displacement (soft sediment)
      let sway = sin(this.phase * 0.4 + t * PI) * this.width * 0.12;

      let shade = map(wave, 0, 1, -18, 12);

      fill(
        constrain(red(this.baseCol) + shade, 0, 255),
        constrain(green(this.baseCol) + shade, 0, 255),
        constrain(blue(this.baseCol) + shade, 0, 255),
        215
      );

      rect(px, sway, this.length / this.segments + 0.6, w, 1.6);
    }

    pop();
  }
}
