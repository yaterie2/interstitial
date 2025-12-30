class Copepod {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.angle = random(TWO_PI);

    // -------- SIZE (biologically correct) --------
    this.bodyLength = random(10, 14); // smaller than tardigrade
    this.bodyWidth = random(4, 6);

    // -------- MOVEMENT PARAMETERS --------
    this.speed = random(0.6, 1.2); // faster than nematodes
    this.burstSpeed = random(1.8, 2.6);
    this.state = "pause";
    this.stateTimer = floor(random(20, 80));

    // -------- BEHAVIOR --------
    this.turnRate = random(0.04, 0.09);
    this.biasToBiofilm = random(0.3, 0.6);
  }

  update() {
    this.stateTimer--;

    // -------- STATE SWITCHING (burst / pause) --------
    if (this.stateTimer <= 0) {
      if (this.state === "pause") {
        this.state = "burst";
        this.stateTimer = floor(random(8, 18));
        this.angle += random(-PI / 3, PI / 3);
      } else {
        this.state = "pause";
        this.stateTimer = floor(random(20, 70));
      }
    }

    // -------- MOVEMENT --------
    if (this.state === "burst") {
      let dir = p5.Vector.fromAngle(this.angle);
      dir.mult(this.burstSpeed);
      this.pos.add(dir);
    } else {
      // subtle drifting + probing
      this.angle += random(-this.turnRate, this.turnRate);
    }

    // -------- EDGE HANDLING --------
    if (this.pos.x < 0 || this.pos.x > width) this.angle = PI - this.angle;
    if (this.pos.y < 0 || this.pos.y > height) this.angle = -this.angle;

    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    noStroke();

    // -------- BODY SEGMENTS --------
    fill(170, 190, 200, 230);
    ellipse(0, 0, this.bodyLength, this.bodyWidth);

    fill(160, 175, 185, 230);
    ellipse(
      -this.bodyLength * 0.25,
      0,
      this.bodyLength * 0.6,
      this.bodyWidth * 0.9
    );

    // -------- ANTENNAE (KEY IDENTIFIER) --------
    stroke(190, 210, 220, 200);
    strokeWeight(1);

    let antLen = random(6, 10);
    line(
      this.bodyLength * 0.45,
      -this.bodyWidth * 0.3,
      this.bodyLength * 0.45 + antLen,
      -this.bodyWidth
    );
    line(
      this.bodyLength * 0.45,
      this.bodyWidth * 0.3,
      this.bodyLength * 0.45 + antLen,
      this.bodyWidth
    );

    // -------- LEG FLICK SUGGESTION --------
    stroke(150, 165, 175, 160);
    for (let i = -1; i <= 1; i++) {
      line(
        -this.bodyLength * 0.1,
        i * this.bodyWidth * 0.3,
        -this.bodyLength * 0.3,
        i * this.bodyWidth * 0.6
      );
    }

    pop();
  }
}
