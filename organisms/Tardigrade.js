// ------------------------------------------------------------
// Tardigrade (Water Bear)
// Slow crawling micro-predator / grazer
// ------------------------------------------------------------

class Tardigrade {
  constructor(x, y) {
    this.speciesName = "Tardigrade (Water Bear)";
    this.speciesId = "tardigrade";

    // ---- POSITION ----
    this.x = x;
    this.y = y;

    // ---- SIZE & MOTION ----
    this.size = random(10, 16);
    this.speed = random(0.15, 0.35);

    this.dir = random(TWO_PI);
    this.wiggle = random(1000);
    this.legPhase = random(TWO_PI);

    // ---- BODY GEOMETRY ----
    this.bodySegments = 4;
    this.segmentSpacing = this.size * 0.6;

    // 🔑 true visual center of body (local space)
    this.bodyCenterOffset = (this.bodySegments - 1) * this.segmentSpacing * 0.5;

    // ---- HIT / HIGHLIGHT ----
    this.hitX = this.x;
    this.hitY = this.y;

    this.highlightX = this.x;
    this.highlightY = this.y;
    this.highlightRadius = this.size * 2.2;
  }

  // ----------------------------------------------------------
  update() {
    // slow random crawling
    this.wiggle += 0.01;
    this.dir += map(noise(this.wiggle), 0, 1, -0.02, 0.02);

    this.x += cos(this.dir) * this.speed;
    this.y += sin(this.dir) * this.speed;

    this.legPhase += 0.08;

    // ---- CENTER OF BODY (ROTATION-AWARE) ----
    let cx = cos(this.dir) * this.bodyCenterOffset;
    let cy = sin(this.dir) * this.bodyCenterOffset;

    this.highlightX = this.x + cx;
    this.highlightY = this.y + cy;

    this.hitX = this.highlightX;
    this.hitY = this.highlightY;
  }

  // ----------------------------------------------------------
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.dir);

    noStroke();

    // ---- BODY SEGMENTS ----
    for (let i = 0; i < this.bodySegments; i++) {
      let t = i / (this.bodySegments - 1);
      let w = lerp(this.size * 1.2, this.size * 0.8, t);
      let h = lerp(this.size * 0.9, this.size * 0.6, t);

      fill(185, 175, 165, 220);
      ellipse(i * this.segmentSpacing, 0, w, h);
    }

    // ---- LEGS (8 TOTAL) ----
    stroke(150, 140, 130, 200);
    strokeWeight(1);

    for (let side of [-1, 1]) {
      for (let i = 0; i < this.bodySegments; i++) {
        let x = i * this.segmentSpacing;
        let y = side * this.size * 0.35;

        let lift = sin(this.legPhase + i * 0.6 + side) * 2;
        line(x, y, x + 2, y + lift);
      }
    }

    pop();
  }
}
