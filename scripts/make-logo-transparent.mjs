import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';

const logoPath = path.resolve(process.cwd(), 'public', 'celine-logo.png');

const buf = fs.readFileSync(logoPath);
const png = PNG.sync.read(buf);

// Remove the faint textured/dithered background while preserving the logo.
// Strategy:
// - Estimate background color from the four corners.
// - Remove pixels that are either (a) very light, low-saturation OR (b) close to that background color.
const sample = (x, y) => {
  const idx = (png.width * y + x) << 2;
  return [png.data[idx], png.data[idx + 1], png.data[idx + 2]];
};

const corners = [
  sample(0, 0),
  sample(png.width - 1, 0),
  sample(0, png.height - 1),
  sample(png.width - 1, png.height - 1),
];

const bg = corners.reduce(
  (acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]],
  [0, 0, 0]
).map((v) => Math.round(v / corners.length));

const dist = (r, g, b, rr, gg, bb) => {
  const dr = r - rr;
  const dg = g - gg;
  const db = b - bb;
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

const maxSatDelta = 34; // allow more variation to catch dotted texture
const minLight = 210; // lower to include off-white texture
const bgDistThreshold = 48; // remove pixels close to the sampled background

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];
    const a = png.data[idx + 3];

    if (a === 0) continue;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    const isLight = r >= minLight && g >= minLight && b >= minLight;
    const isLowSat = delta <= maxSatDelta;
    const isNearBg = dist(r, g, b, bg[0], bg[1], bg[2]) <= bgDistThreshold;

    // Remove background candidates only (light + low saturation) or pixels near the corner background color.
    if ((isLight && isLowSat) || isNearBg) {
      png.data[idx + 3] = 0;
    }
  }
}

fs.writeFileSync(logoPath, PNG.sync.write(png));
console.log(`Updated: ${logoPath}`);

