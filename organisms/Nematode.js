// ------------------------------------------------------------
// Nematode (Roundworm)
// Continuous motion with curvature-based looping (no jumps)
// ------------------------------------------------------------

class Nematode {
  constructor(x, y) {
    this.speciesName = "Nematode (Roundworm)";

    // optional but recommended
    this.speciesId = "nematode";
    // ---- SPINE ----
    this.segmentCount = 46;
    this.segmentLength = random(1.15, 1.4);
    this.spine = [];

    for (let i = 0; i < this.segmentCount; i++) {
      this.spine.push(createVector(x - i * this.segmentLength, y));
    }

    // 🔴 exposed positions for camera & picking
    this.x = x;
    this.y = y;
    this.hitX = x;
    this.hitY = y;

    // ---- MOTION ----
    this.heading = random(TWO_PI);
    this.speed = random(0.12, 0.24);

    // ---- CURVATURE CONTROL ----
    this.baseTurnNoise = random(1000);
    this.curvature = 0;
    this.curvatureTarget = 0;

    // ---- LOOP TRIGGER ----
    this.loopCooldown = floor(random(420, 900));
    this.loopStrength = 0;

    // ---- UNDULATION ----
    this.phase = random(TWO_PI);
    this.waveSpeed = random(0.045, 0.07);
    this.waveAmp = random(1.2, 1.9);

    // ---- APPEARANCE ----
    this.maxThickness = random(2.6, 3.4);
    this.baseCol = color(
      random(200, 220),
      random(190, 210),
      random(170, 190),
      220
    );

    // ---- HIGHLIGHT PROPERTIES ----
    this.highlightX = x;
    this.highlightY = y;
    this.highlightRadius = this.maxThickness * 6;
  }

  // ----------------------------------------------------------
  update() {
    let head = this.spine[0];

    // ---- BASE DIRECTION DRIFT ----
    let baseTurn = map(noise(this.baseTurnNoise), 0, 1, -0.004, 0.004);
    this.baseTurnNoise += 0.0025;

    // ---- LOOP TRIGGER ----
    this.loopCooldown--;
    if (this.loopCooldown <= 0) {
      this.loopStrength = random(0.015, 0.025);
      this.curvatureTarget =
        random() < 0.5 ? this.loopStrength : -this.loopStrength;
      this.loopCooldown = floor(random(620, 1300));
    }

    // ---- CURVATURE DECAY ----
    this.curvature = lerp(this.curvature, this.curvatureTarget, 0.04);
    this.curvatureTarget *= 0.996;

    // ---- APPLY TURN ----
    this.heading += baseTurn + this.curvature;

    // ---- MOVE FORWARD ----
    head.x += cos(this.heading) * this.speed;
    head.y += sin(this.heading) * this.speed;

    // ---- SPINE FOLLOW ----
    for (let i = 1; i < this.segmentCount; i++) {
      let prev = this.spine[i - 1];
      let curr = this.spine[i];
      let dir = p5.Vector.sub(curr, prev);
      dir.setMag(this.segmentLength);
      curr.set(p5.Vector.add(prev, dir));
    }

    this.phase += this.waveSpeed;

    // ---- WORLD WRAP ----
    if (head.x < 0) head.x = width;
    if (head.x > width) head.x = 0;
    if (head.y < 0) head.y = height;
    if (head.y > height) head.y = 0;

    // 🔴 CAMERA POSITION (head)
    this.x = head.x;
    this.y = head.y;

    // 🔴 HIT POSITION (body center)
    let mid = this.spine[Math.floor(this.segmentCount * 0.45)];
    this.hitX = mid.x;
    this.hitY = mid.y;

    // 🔵 HIGHLIGHT POSITION (mid-body, stable)
    this.highlightX = mid.x;
    this.highlightY = mid.y;

    // 🔵 HIGHLIGHT SIZE (scales with body)
    this.highlightRadius = this.maxThickness * 6;
  }

  // ----------------------------------------------------------
  display() {
    noStroke();

    for (let i = this.segmentCount - 1; i >= 0; i--) {
      let p = this.spine[i];
      let t = i / (this.segmentCount - 1);

      let profile = sin(t * PI);
      let thickness = this.maxThickness * profile;

      let wave = sin(this.phase + t * TWO_PI) * this.waveAmp * profile * 0.28;

      let shade = map(profile, 0, 1, -30, 26);

      fill(
        constrain(red(this.baseCol) + shade, 0, 255),
        constrain(green(this.baseCol) + shade, 0, 255),
        constrain(blue(this.baseCol) + shade, 0, 255),
        220
      );

      ellipse(p.x, p.y + wave, thickness * 1.9, thickness);
    }
  }
}
