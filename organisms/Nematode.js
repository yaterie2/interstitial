// ------------------------------------------------------------
// Nematode (Roundworm)
// Meiofaunal grazer living between sand grains
// ------------------------------------------------------------

class Nematode {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.dir = p5.Vector.random2D();
    this.speed = random(0.15, 0.35);

    // body
    this.length = random(18, 32); // microscopic but visible
    this.thickness = random(1.6, 2.4);

    // undulation
    this.phase = random(TWO_PI);
    this.waveSpeed = random(0.08, 0.14);
    this.waveAmp = random(0.8, 1.6);

    // behavior
    this.turnNoise = random(1000);
  }

  // ----------------------------------------------------------
  // MOVEMENT
  // ----------------------------------------------------------
  update() {
    // gentle directional drift (sediment constrained)
    let turn = map(noise(this.turnNoise), 0, 1, -0.12, 0.12);
    this.turnNoise += 0.01;

    this.dir.rotate(turn);
    this.pos.add(p5.Vector.mult(this.dir, this.speed));

    this.phase += this.waveSpeed;

    // keep inside world
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  // ----------------------------------------------------------
  // RENDERING
  // ----------------------------------------------------------
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.dir.heading());

    noFill();
    strokeWeight(this.thickness);
    stroke(210, 200, 185, 200); // pale, organic tone

    beginShape();
    let segments = 14;

    for (let i = 0; i <= segments; i++) {
      let t = i / segments;
      let x = lerp(0, this.length, t);
      let y = sin(this.phase + t * TWO_PI) * this.waveAmp * (1 - t); // taper tail
      curveVertex(x, y);
    }
    endShape();

    pop();
  }
}
