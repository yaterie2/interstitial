class Sand {
  constructor() {
    this.resolution = 2;
    this.grains = [];
    this.sprinkles = [];
    this.buffer = createGraphics(width, height);
    this.generate();
  }

  generate() {
    noiseSeed(floor(random(10000)));
    let g = this.buffer;
    g.noStroke();
    g.clear();

    let numGrains = 50;
    let grainCenters = [];
    let minDist = 95;

    // -------------------------------
    // PLACE GRAIN CENTERS
    // -------------------------------
    for (let i = 0; i < numGrains; i++) {
      let tries = 0,
        cx,
        cy,
        ok;
      do {
        ok = true;
        cx = random(width);
        cy = random(height);
        for (let p of grainCenters) {
          if (dist(cx, cy, p.x, p.y) < minDist) {
            ok = false;
            break;
          }
        }
        tries++;
        if (tries > 40) break;
      } while (!ok);
      grainCenters.push({ x: cx, y: cy });
    }

    // -------------------------------
    // GENERATE GRAINS
    // -------------------------------
    for (let p of grainCenters) {
      let cx = p.x;
      let cy = p.y;

      let rimWidth = random(0.18, 0.38);
      let rimStrength = random(0.6, 1.25);
      let rimDepth;

      let rimType = random();
      if (rimType < 0.01) rimDepth = random(4.6, 5.4);
      else if (rimType < 0.04) rimDepth = random(2.6, 3.4);
      else if (rimType < 0.14) rimDepth = random(1.7, 2.3);
      else rimDepth = random(0.85, 1.5);

      let numCenters = floor(random(5, 7));
      let centers = [];
      let grainScale = random(0.8, 1.25);
      let step = map(grainScale, 0.8, 1.25, 1.2, 2.2, true);

      centers.push({
        x: cx,
        y: cy,
        r: random(50, 64) * grainScale,
        band: random(),
      });

      for (let i = 1; i < numCenters; i++) {
        let a = random(TWO_PI);
        let d = random(14, 36) * grainScale;
        centers.push({
          x: cx + cos(a) * d,
          y: cy + sin(a) * d,
          r: random(26, 44) * grainScale,
          band: random(),
        });
      }

      let maxR = 70 * grainScale;
      let fieldCutoff = map(grainScale, 0.8, 1.25, 0.18, 0.28, true);

      for (let x = cx - maxR; x <= cx + maxR; x += step) {
        for (let y = cy - maxR; y <= cy + maxR; y += step) {
          let field = 0;
          for (let c of centers) {
            let d = dist(x, y, c.x, c.y);
            if (d < c.r) field += pow(1 - d / c.r, 1.4);
          }
          if (grainScale < 1) field *= 1.35;
          if (field < fieldCutoff) continue;

          let jx = x + random(-0.25, 0.25);
          let jy = y + random(-0.25, 0.25);

          let bandSum = 0,
            bandWeight = 0;
          for (let c of centers) {
            let d = dist(jx, jy, c.x, c.y);
            if (d < c.r) {
              let w = pow(1 - d / c.r, 1.6);
              bandSum += c.band * w;
              bandWeight += w;
            }
          }
          let band = bandWeight > 0 ? bandSum / bandWeight : 0.5;

          let base;
          if (band < 0.26) base = color(60, 110, 200);
          else if (band < 0.46) base = color(150, 90, 210);
          else if (band < 0.64) base = color(210, 120, 80);
          else if (band < 0.82) base = color(90, 160, 120);
          else base = color(200, 185, 90);

          let n1 = noise(jx * 0.018, jy * 0.018);
          let n2 = noise(jx * 0.045 + 300, jy * 0.045 + 300);
          let n3 = noise(jx * 0.11 + 900, jy * 0.11 + 900);

          let lum = map(n1, 0, 1, -70, 80) + map(n2, 0, 1, -50, 60);

          let r = red(base) + lum + map(n2, 0, 1, -55, 55);
          let gcol = green(base) + lum + map(n3, 0, 1, -45, 45);
          let b = blue(base) + lum + map(n1, 0, 1, -65, 65);

          if (n3 > 0.88 && field > 0.6) {
            let spike = map(n3, 0.9, 1.0, 160, 255);
            r += spike;
            gcol += spike;
            b += spike;
          }

          let n4 = noise(jx * 0.19 + 1400, jy * 0.19 + 1400);
          if (n4 > 0.93 && field > 0.55) {
            r = lerp(r, 255, 0.75);
            gcol = lerp(gcol, 255, 0.75);
            b = lerp(b, 255, 0.75);
          }

          r = constrain(r, 0, 255);
          gcol = constrain(gcol, 0, 255);
          b = constrain(b, 0, 255);

          let ccol = color(r, gcol, b);

          let rimField = pow(field, rimDepth);
          let rim = map(
            rimField,
            fieldCutoff,
            fieldCutoff + rimWidth,
            1,
            0,
            true
          );
          if (rim > 0) {
            let rimNoise = noise(jx * 0.04 + 500, jy * 0.04 + 500);
            let rimDark = 12 + rimNoise * 36;
            let depthBlend = map(rimDepth, 1.0, 5.4, 1.0, 0.55, true);
            let rimAmount = constrain(rim * rimStrength * depthBlend, 0, 0.9);
            ccol = lerpColor(ccol, color(rimDark), rimAmount);
          }

          let size =
            max(step * 1.05, step * grainScale * 0.95) *
            map(field, fieldCutoff, 1.3, 1.05, 1.35, true);

          g.fill(ccol);
          g.rect(jx, jy, size, size);

          let sprinkleNoise = noise(jx * 0.55 + 8000, jy * 0.55 + 8000);
          if (sprinkleNoise > 0.985 && field > 0.6) {
            g.fill(255);
            g.rect(jx, jy, size * random(2.2, 3.2), size * random(2.2, 3.2));
          }
        }
      }
    }
  }

  display() {
    image(this.buffer, 0, 0);
  }
}
