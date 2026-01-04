class Background {
  constructor() {
    this.buffer = createGraphics(width, height);
    this.generate();
  }

  generate() {
    const g = this.buffer;
    g.noStroke();

    // --- BASE GRADIENT (muted purple sediment) ---
    for (let y = 0; y < height; y++) {
      let ty = y / height;

      // softer, purple-shifted palette
      let colTop = color(135, 140, 165); // cool lavender-grey
      let colMid = color(120, 130, 155); // muted violet-blue
      let colBot = color(105, 115, 140); // deeper bluish purple

      let base;
      if (ty < 0.5) {
        base = lerpColor(colTop, colMid, ty * 2);
      } else {
        base = lerpColor(colMid, colBot, (ty - 0.5) * 2);
      }

      g.fill(base);
      g.rect(0, y, width, 1);
    }

    // --- VERY SUBTLE COLOR NOISE (LOW CONTRAST) ---
    g.loadPixels();
    for (let i = 0; i < g.pixels.length; i += 4) {
      let nr = random(-4, 4);
      let ng = random(-4, 4);
      let nb = random(-6, 6); // slightly more blue/purple variance

      g.pixels[i] = constrain(g.pixels[i] + nr, 0, 255);
      g.pixels[i + 1] = constrain(g.pixels[i + 1] + ng, 0, 255);
      g.pixels[i + 2] = constrain(g.pixels[i + 2] + nb, 0, 255);
    }
    g.updatePixels();

    // --- SOFT VIGNETTE (VERY LOW CONTRAST) ---
    g.noFill();
    g.stroke(40, 45, 70, 18);
    g.strokeWeight(min(width, height) * 0.06);
    g.rect(
      g.strokeWeight() / 2,
      g.strokeWeight() / 2,
      width - g.strokeWeight(),
      height - g.strokeWeight(),
      48
    );
  }

  display() {
    image(this.buffer, 0, 0);
  }

  render(x, y, size) {
    image(this.buffer, x, y, size, size);
  }
}
