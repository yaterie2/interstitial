// Kinorhynch.js
// ------------------------------------------------------------
// Kinorhynch ("Mud dragon")
// Correct mirrored locomotion, rigid anterior,
// posterior-only bending, single introvert with eversion,
// tail spines angled outward
// ------------------------------------------------------------

class Kinorhynch {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // ---- BODY ----
    this.scale = random(0.45, 0.7);
    this.length = random(13, 17) * this.scale;
    this.width = random(4.8, 6.5) * this.scale;
    this.segments = floor(random(8, 11)) + 2; // 🔴 one segment longer

    // ---- ORIENTATION ----
    this.angle = random(TWO_PI);

    // ---- INTROVERT ----
    this.introvert = 0;
    this.state = "extend";
    this.timer = 0;

    // ---- MOTION ----
    this.pullStrength = random(0.32, 0.5);

    // ---- POSTERIOR BENDING ONLY ----
    this.curve = random(-0.4, 0.4);
    this.curveTarget = this.curve;

    // ---- COLOR ----
    this.baseCol = color(
      random(125, 145),
      random(140, 165),
      random(110, 130),
      220
    );
  }

  // ----------------------------------------------------------
  update() {
    // sparse, slow curvature changes
    if (random() < 0.01) {
      this.curveTarget = random(-0.6, 0.6);
    }
    this.curve = lerp(this.curve, this.curveTarget, 0.015);

    switch (this.state) {
      case "extend":
        this.introvert += 0.025;
        if (this.introvert >= 1) {
          this.introvert = 1;
          this.state = "anchor";
          this.timer = floor(random(12, 20));
        }
        break;

      case "anchor":
        this.timer--;
        if (this.timer <= 0) {
          this.state = "retract";
        }
        break;

      case "retract":
        this.introvert -= 0.03;

        // 🔴 pull starts BEFORE full retraction
        if (this.introvert < 0.6) {
          this.x -= cos(this.angle) * this.pullStrength * 0.6;
          this.y -= sin(this.angle) * this.pullStrength * 0.6;
        }

        if (this.introvert <= 0) {
          this.introvert = 0;
          this.angle += random(-0.25, 0.25);
          this.state = "pause";
          this.timer = floor(random(20, 34));
        }
        break;

      case "pause":
        this.timer--;
        if (this.timer <= 0) {
          this.state = "extend";
        }
        break;
    }

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

    let lastSegX = 0;
    let lastSegY = 0;

    // ---- BODY SEGMENTS ----
    for (let i = 0; i < this.segments; i++) {
      let t = i / (this.segments - 1);
      let px = map(t, 0, 1, -this.length * 0.45, this.length * 0.45);

      let bend = 0;
      if (t > 0.5) {
        let k = map(t, 0.5, 1.0, 0, 1);
        bend = this.curve * k * this.width * 0.9;
      }

      let w = lerp(this.width * 1.1, this.width * 0.85, t);
      let shade = i % 2 === 0 ? -14 : 8;

      fill(
        constrain(red(this.baseCol) + shade, 0, 255),
        constrain(green(this.baseCol) + shade, 0, 255),
        constrain(blue(this.baseCol) + shade, 0, 255),
        220
      );

      rect(px, bend, this.length / this.segments + 0.5, w, 1.2);

      if (i === this.segments - 1) {
        lastSegX = px;
        lastSegY = bend;
      }
    }

    // ---- INTROVERT (inside-out eversion illusion) ----
    let headLen = this.length * 0.48 * this.introvert;

    if (headLen > 0.1) {
      let bulge = pow(max(0, this.introvert - 0.15), 0.9) * this.width * 0.75;

      let invertShade = lerp(20, -25, this.introvert);
      fill(
        constrain(175 + invertShade, 0, 255),
        constrain(165 + invertShade, 0, 255),
        constrain(135 + invertShade, 0, 255),
        225
      );

      rect(
        -this.length * 0.45 - headLen / 2,
        0,
        headLen,
        this.width * 0.6 + bulge,
        1
      );

      // scalids
      // stroke(165, 155, 125, 180);
      // strokeWeight(0.45);
      // for (let i = -1; i <= 1; i++) {
      //   line(
      //     -this.length * 0.45 - headLen,
      //     i * this.width * 0.22,
      //     -this.length * 0.45 - headLen - 3,
      //     i * this.width * 0.22
      //   );
      // }
      // noStroke();
    }

    // ---- POSTERIOR SPINES (angled outward) ----
    stroke(140, 130, 105, 200);
    strokeWeight(0.55);

    let spineAngle = this.width * 0.35;

    line(
      lastSegX,
      lastSegY - this.width * 0.22,
      lastSegX + 3.5,
      lastSegY - this.width * 0.22 - spineAngle
    );
    line(
      lastSegX,
      lastSegY + this.width * 0.22,
      lastSegX + 3.5,
      lastSegY + this.width * 0.22 + spineAngle
    );

    pop();
  }
}
