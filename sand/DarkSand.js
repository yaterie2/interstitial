class DarkSand {
  constructor() {
    this.buffer = createGraphics(width, height);
    this.generate();
  }

  generate() {
    noiseSeed(floor(random(10000)));
    let g = this.buffer;
    g.noStroke();
    g.clear();

    let numGrains = 77;
    let step = 3;
    let grainCenters = [];
    let minDist = 90;

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

    for (let p of grainCenters) {
      let cx = p.x;
      let cy = p.y;
      let grainScale = random(0.6, 1.6);
      let maxR = 60 * grainScale;
      let localStep = step * grainScale;

      let numCenters = floor(random(4, 6));
      let centers = [];
      let sparkleType =
        random() < 0.3 ? (random() < 0.5 ? "brown" : "green") : null;

      centers.push({
        x: cx,
        y: cy,
        r: random(48, 62) * grainScale,
        sparkle: sparkleType,
      });

      for (let i = 1; i < numCenters; i++) {
        let a = random(TWO_PI);
        let d = random(12, 32) * grainScale;
        centers.push({
          x: cx + cos(a) * d,
          y: cy + sin(a) * d,
          r: random(24, 40) * grainScale,
          sparkle: sparkleType,
        });
      }

      for (let x = cx - maxR; x <= cx + maxR; x += localStep) {
        for (let y = cy - maxR; y <= cy + maxR; y += localStep) {
          let field = 0;
          let nearest = null;
          let nearestDist = Infinity;

          for (let c of centers) {
            let d = dist(x, y, c.x, c.y);
            if (d < c.r) field += pow(1 - d / c.r, 1.8);
            if (d < nearestDist) {
              nearestDist = d;
              nearest = c;
            }
          }
          if (field < 0.35) continue;

          let jx = x + random(-0.4, 0.4);
          let jy = y + random(-0.4, 0.4);

          let baseDark = 18 + noise(jx * 0.05, jy * 0.05) * 48;
          let alphaVal = 210 + noise(jx * 0.02, jy * 0.02) * 35;
          let ccol = color(baseDark, baseDark, baseDark, alphaVal);

          if (nearest && nearest.sparkle) {
            let t = noise(jx * 0.015 + 300, jy * 0.015 + 300);
            if (t > 0.58) {
              let strength = map(t, 0.58, 0.85, 0.28, 0.85, true);
              if (nearest.sparkle === "brown") {
                ccol = lerpColor(
                  ccol,
                  color(baseDark + 40, baseDark + 30, baseDark + 10, alphaVal),
                  strength
                );
              } else {
                ccol = lerpColor(
                  ccol,
                  color(baseDark + 10, baseDark + 50, baseDark + 10, alphaVal),
                  strength
                );
              }
            }
          }

          let size =
            map(field, 0.35, 1.2, 3.5, 12.5, true) *
            grainScale *
            random(0.8, 1.25);

          g.fill(ccol);
          g.rect(jx, jy, size, size);
        }
      }
    }
  }

  display() {
    image(this.buffer, 0, 0);
  }
}
