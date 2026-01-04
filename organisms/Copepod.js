// ------------------------------------------------------------
// Harpacticoid Copepod – rebuilt
// Burst locomotion, compact crustacean morphology
// ------------------------------------------------------------

class Copepod {
  constructor(x, y) {
    this.speciesName = "Harpacticoid Copepod";
    this.speciesId = "copepod";

    this.x = x;
    this.y = y;

    this.angle = random(TWO_PI);
    this.angularVel = 0;

    this.bodyLength = random(9, 13);
    this.bodyWidth = random(3.5, 5);

    this.speed = random(0.4, 0.8);
    this.burstSpeed = random(1.6, 2.4);

    this.state = "pause";
    this.timer = floor(random(20, 60));

    this.antLen = random(6, 9);

    // ---- HIGHLIGHT PROPERTIES ----
    this.highlightX = this.x;
    this.highlightY = this.y;
    this.highlightRadius = this.bodyLength * 2.4;
  }

  update() {
    this.timer--;

    if (this.timer <= 0) {
      if (this.state === "pause") {
        this.state = "burst";
        this.timer = floor(random(6, 14));
        this.angularVel += random(-0.35, 0.35);
      } else {
        this.state = "pause";
        this.timer = floor(random(25, 70));
      }
    }

    // smooth steering
    this.angularVel += random(-0.015, 0.015);
    this.angularVel *= 0.88;
    this.angle += this.angularVel;

    // movement
    let v = this.state === "burst" ? this.burstSpeed : this.speed;
    this.x += cos(this.angle) * v;
    this.y += sin(this.angle) * v;

    // wrap
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // ---- HIGHLIGHT UPDATE ----
    this.highlightX = this.x;
    this.highlightY = this.y;

    // subtle pulse (feels alive, not UI-ish)
    this.highlightRadius =
      this.bodyLength * (2.3 + sin(frameCount * 0.05) * 0.15);
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();

    // body – teardrop
    fill(170, 190, 200, 230);
    ellipse(0, 0, this.bodyLength, this.bodyWidth);

    fill(150, 170, 180, 220);
    ellipse(
      -this.bodyLength * 0.25,
      0,
      this.bodyLength * 0.75,
      this.bodyWidth * 1.1
    );

    // pointed posterior
    fill(140, 160, 170, 220);
    triangle(
      -this.bodyLength * 0.55,
      0,
      -this.bodyLength * 0.8,
      -this.bodyWidth * 0.25,
      -this.bodyLength * 0.8,
      this.bodyWidth * 0.25
    );

    // antennae
    stroke(190, 210, 220, 190);
    strokeWeight(1);

    line(
      this.bodyLength * 0.45,
      -this.bodyWidth * 0.3,
      this.bodyLength * 0.45 + this.antLen,
      -this.bodyWidth
    );
    line(
      this.bodyLength * 0.45,
      this.bodyWidth * 0.3,
      this.bodyLength * 0.45 + this.antLen,
      this.bodyWidth
    );

    // legs (subtle)
    stroke(150, 165, 175, 150);
    for (let i = -1; i <= 1; i++) {
      line(
        -this.bodyLength * 0.1,
        i * this.bodyWidth * 0.25,
        -this.bodyLength * 0.3,
        i * this.bodyWidth * 0.55
      );
    }

    pop();
  }
}
