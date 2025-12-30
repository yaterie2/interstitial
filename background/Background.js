class Background {
  constructor() {
    this.buffer = createGraphics(width, height);
    this.generate();
  }

  generate() {
    this.buffer.noStroke();

    for (let y = 0; y < height; y++) {
      let t = y / height;

      // soft microscope-like gradient
      let base = lerpColor(color(230, 232, 235), color(200, 205, 210), t);

      this.buffer.fill(base);
      this.buffer.rect(0, y, width, 1);
    }

    // optional subtle noise texture
    this.buffer.loadPixels();
    for (let i = 0; i < this.buffer.pixels.length; i += 4) {
      let n = random(-6, 6);
      this.buffer.pixels[i] += n;
      this.buffer.pixels[i + 1] += n;
      this.buffer.pixels[i + 2] += n;
    }
    this.buffer.updatePixels();
  }

  display() {
    image(this.buffer, 0, 0);
  }

  render(x, y, size) {
    image(this.buffer, x, y, size, size);
  }
}
