// Diatom.js
// ------------------------------------------------------------
// Benthic diatoms (silica-shelled microalgae)
// Primary producers, sediment stabilizers
// ------------------------------------------------------------

class Diatom {
  constructor(x, y) {
    this.speciesName = "Diatom (Benthic Microalgae)";

    // optional but recommended
    this.speciesId = "diatom";
    this.pos = createVector(x, y);

    // size slightly larger than bacteria, smaller than forams
    this.scale = random(0.8, 1.3);

    // pennate or centric
    this.type = random() < 0.65 ? "pennate" : "centric";

    this.angle = random(TWO_PI);

    // very slow gliding motion
    this.glideDir = p5.Vector.fromAngle(this.angle);
    this.glideSpeed = random(0.005, 0.02);

    // silica coloration
    // benthic diatom pigmentation (fucoxanthin-dominated)
    let t = random();
    if (t < 0.4) {
      // olive-gold
      this.col = color(165, 185, 110);
    } else if (t < 0.7) {
      // yellow-brown
      this.col = color(185, 175, 105);
    } else {
      // greenish-olive
      this.col = color(145, 175, 120);
    }

    this.generateGeometry();

    // --- EXPOSE POSITIONS (REQUIRED BY SYSTEM) ---
    this.x = this.pos.x;
    this.y = this.pos.y;

    this.hitX = this.pos.x;
    this.hitY = this.pos.y;

    this.highlightX = this.pos.x;
    this.highlightY = this.pos.y;
    this.highlightRadius =
      this.type === "pennate" ? this.length * 1.8 : this.radius * 2.2;
  }

  generateGeometry() {
    if (this.type === "pennate") {
      this.length = random(6, 10) * this.scale;
      this.width = random(2.2, 3.2) * this.scale;
    } else {
      this.radius = random(3.5, 5.5) * this.scale;
    }
  }

  update() {
    // extremely subtle gliding
    this.pos.add(p5.Vector.mult(this.glideDir, this.glideSpeed));

    // slight orientation drift
    this.angle += random(-0.002, 0.002);

    // keep within canvas
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);

    // ---- SYNC POSITIONS ----
    this.x = this.pos.x;
    this.y = this.pos.y;

    this.hitX = this.pos.x;
    this.hitY = this.pos.y;

    this.highlightX = this.pos.x;
    this.highlightY = this.pos.y;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noFill();

    // silica shell with bright edge
    stroke(red(this.col) + 35, green(this.col) + 35, blue(this.col) + 25, 210);
    strokeWeight(0.7);

    if (this.type === "pennate") {
      fill(red(this.col), green(this.col), blue(this.col), 35);

      // main body
      ellipse(0, 0, this.length, this.width);

      // central raphe (key diatom feature)
      stroke(200, 200, 200, 120);
      line(-this.length * 0.45, 0, this.length * 0.45, 0);

      // subtle striae suggestion
      stroke(210, 210, 210, 80);
      for (let i = -2; i <= 2; i++) {
        line(
          -this.length * 0.35,
          i * this.width * 0.2,
          this.length * 0.35,
          i * this.width * 0.2
        );
      }
    } else {
      // centric diatom
      ellipse(0, 0, this.radius * 2, this.radius * 2);

      // radial symmetry lines
      stroke(200, 200, 200, 90);
      for (let i = 0; i < 8; i++) {
        let a = (TWO_PI / 8) * i;
        line(0, 0, cos(a) * this.radius, sin(a) * this.radius);
      }
    }

    pop();
  }
}
