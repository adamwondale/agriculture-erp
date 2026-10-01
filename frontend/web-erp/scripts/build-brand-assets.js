const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcPath = 'C:/Users/AKAM/.gemini/antigravity-ide/brain/35d84c95-5668-4d62-ae9f-ddbbb9a63fb3/.user_uploaded/media_1790023703112.png';
const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'app');

function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // count

  let offset = 6 + 16 * pngBuffers.length;
  const entries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += img.buffer.length;
  }
  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function run() {
  console.log('Generating brand assets from uploaded logo...');

  // 1. Copy original file
  fs.copyFileSync(srcPath, path.join(publicDir, 'logo-original.png'));

  // 2. Compute transparent version with clean un-premultiplied matte
  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const transData = Buffer.alloc(info.width * info.height * 4);
  const whiteData = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const minVal = Math.min(r, g, b);
    let alpha = 255 - minVal;

    if (minVal > 248) {
      alpha = 0;
    } else if (alpha < 12) {
      alpha = 0;
    }

    if (alpha === 0) {
      transData[i] = 0;
      transData[i+1] = 0;
      transData[i+2] = 0;
      transData[i+3] = 0;

      whiteData[i] = 255;
      whiteData[i+1] = 255;
      whiteData[i+2] = 255;
      whiteData[i+3] = 0;
    } else {
      const a = alpha / 255;
      transData[i] = Math.min(255, Math.max(0, Math.round((r - 255 * (1 - a)) / a)));
      transData[i+1] = Math.min(255, Math.max(0, Math.round((g - 255 * (1 - a)) / a)));
      transData[i+2] = Math.min(255, Math.max(0, Math.round((b - 255 * (1 - a)) / a)));
      transData[i+3] = alpha;

      whiteData[i] = 255;
      whiteData[i+1] = 255;
      whiteData[i+2] = 255;
      whiteData[i+3] = alpha;
    }
  }

  // Save full transparent logo (trimmed with 20px padding)
  const fullTransBuf = await sharp(transData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 60, top: 50, width: 910, height: 890 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo.png'), fullTransBuf);

  // Save white full logo
  const fullWhiteBuf = await sharp(whiteData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 60, top: 50, width: 910, height: 890 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo-white.png'), fullWhiteBuf);

  // 3. Extract square emblem mark (figures + leaves)
  const markBuf = await sharp(transData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 140, top: 40, width: 745, height: 605 })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo-mark.png'), markBuf);

  // Save white mark
  const markWhiteBuf = await sharp(whiteData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 140, top: 40, width: 745, height: 605 })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo-mark-white.png'), markWhiteBuf);

  // 4. App router icon & Apple icons
  fs.writeFileSync(path.join(appDir, 'icon.png'), markBuf);
  
  const appleIcon = await sharp(markBuf)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIcon);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

  // 5. Favicon PNGs
  const fav32 = await sharp(markBuf)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), fav32);

  const fav16 = await sharp(markBuf)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), fav16);

  // 6. Multi-resolution ICO (16, 32, 48, 64)
  const icoSizes = [16, 32, 48, 64];
  const icoPngs = [];
  for (const s of icoSizes) {
    const buf = await sharp(markBuf)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    icoPngs.push({ width: s, height: s, buffer: buf });
  }

  const icoBuf = createIco(icoPngs);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuf);

  // Clean test files
  try { fs.unlinkSync(path.join(publicDir, 'test-transparent.png')); } catch(e){}
  try { fs.unlinkSync(path.join(publicDir, 'test-emblem.png')); } catch(e){}
  try { fs.unlinkSync(path.join(publicDir, 'test.ico')); } catch(e){}

  console.log('Successfully generated all brand logo and favicon assets!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
