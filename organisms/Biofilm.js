class Biofilm {
  constructor() {
    this.buffer = createGraphics(width, height);
    this.generate();
  }

  generate() {
    let g = this.buffer;
    g.clear();
    g.noStroke();
    g.blendMode(ADD);

    noiseSeed(floor(random(100000)));

    let cellDensity = 0.78;
    let epsScale = 0.018;
    let cellScale = 0.9;

    // ---------------- EPS MATRIX ----------------
    for (let x = 0; x < width; x += 3) {
      for (let y = 0; y < height; y += 3) {
        let n = noise(x * epsScale, y * epsScale);
        if (n > 0.48) {
          let a = map(n, 0.48, 1, 45, 140);
          g.fill(175, 180, 165, a + 30);
          g.rect(x, y, 3, 3);
        }
      }
    }

    // ---------------- MICROBIAL COLONIES ----------------
    let colonyCount = floor(random(160, 220));

    for (let i = 0; i < colonyCount; i++) {
      let cx = random(width);
      let cy = random(height);
      if (noise(cx * 0.01, cy * 0.01) < cellDensity) continue;

      let colonySize = floor(random(6, 16));

      for (let j = 0; j < colonySize; j++) {
        let ox = randomGaussian() * 2.2;
        let oy = randomGaussian() * 2.2;

        let w = random(0.8, 2.8) * cellScale;
        let h = random(0.6, 1.4) * cellScale;

        let base =
          random() < 0.5
            ? color(190, 235, 220, 210)
            : color(210, 195, 235, 210);

        g.push();
        g.translate(cx + ox, cy + oy);
        g.rotate(random(TWO_PI));
        g.fill(base);
        g.ellipse(0, 0, w, h);
        g.pop();
      }
    }

    g.blendMode(BLEND);
  }

  display() {
    image(this.buffer, 0, 0);
  }
}
