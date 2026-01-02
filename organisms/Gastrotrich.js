// Gastrotrich.js
// ------------------------------------------------------------
// Marine gastrotrich (Macrodasyida-type)
// Interstitial decomposer with adhesive tail anchoring
// Distinct from nematodes by: flatter body, slower glide,
// periodic tail adhesion + pivoting
// ------------------------------------------------------------

class Gastrotrich {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // ---- SCALE & SHAPE ----
    this.scale = random(0.55, 0.85); // smaller than nematodes
    this.length = random(10, 15) * this.scale;
    this.width = random(3.8, 5.2) * this.scale;

    // ---- ORIENTATION ----
    this.angle = random(TWO_PI);
    this.speed = random(0.12, 0.22);

    // ---- MOTION STATE ----
    this.state = "glide"; // glide | anchor
    this.timer = floor(random(80, 160));

    // realistic but readable gastrotrich pigmentation
    this.baseCol = color(
      random(210, 225), // warm amber
      random(190, 210), // golden-yellow
      random(150, 175), // organic beige
      210
    );

    // ---- MICRO MOTION ----
    this.phase = random(TWO_PI);
  }

  // ----------------------------------------------------------
  update() {
    this.phase += 0.04;
    this.timer--;

    // STATE SWITCHING
    if (this.timer <= 0) {
      if (this.state === "glide") {
        this.state = "anchor";
        this.timer = floor(random(25, 45));
      } else {
        this.state = "glide";
        this.timer = floor(random(90, 160));
        this.angle += random(-0.6, 0.6); // slight reorientation
      }
    }

    // MOVEMENT
    if (this.state === "glide") {
      this.x += cos(this.angle) * this.speed;
      this.y += sin(this.angle) * this.speed;
    }

    // subtle pivot when anchored
    if (this.state === "anchor") {
      this.angle += sin(this.phase) * 0.015;
    }

    // keep inside canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // ----------------------------------------------------------
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();

    // ---- BODY ----
    fill(this.baseCol);
    ellipse(0, 0, this.length, this.width);

    // ---- INTERNAL GRAIN / GUT TRACE ----
    fill(150, 140, 110, 85);
    ellipse(-this.length * 0.1, 0, this.length * 0.35, this.width * 0.45);

    // ---- DORSAL "HAIRY BACK" TEXTURE ----
    stroke(210, 220, 200, 60);
    strokeWeight(0.35);
    for (let i = -this.length * 0.35; i < this.length * 0.35; i += 2.2) {
      let h = sin(this.phase + i * 0.25) * 0.9;
      line(i, -this.width * 0.45, i, -this.width * 0.45 - h);
    }

    // ---- ADHESIVE TAIL TUBES (VISIBLE ONLY WHEN ANCHORED) ----
    if (this.state === "anchor") {
      stroke(185, 195, 170, 110);
      strokeWeight(0.45);
      line(this.length * 0.45, 0, this.length * 0.7, sin(this.phase) * 1.2);
    }

    pop();
  }
}
