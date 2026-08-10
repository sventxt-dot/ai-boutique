import sharp from 'sharp'

// Step 1: Remove lilac background → logo.png (transparent bg, original colors)
const { data, info } = await sharp('public/images/logo-source.png')
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const pixels = new Uint8Array(data)
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i], g = pixels[i+1], b = pixels[i+2]
  // Target lilac range: R>160, G<160, B>160
  if (r > 160 && g < 160 && b > 160) pixels[i+3] = 0
}
await sharp(Buffer.from(pixels), {
  raw: { width: info.width, height: info.height, channels: 4 }
}).png().toFile('public/images/logo.png')
console.log('Done: public/images/logo.png')

// Step 2: White version — force all non-transparent pixels to white.
// (negate would turn "smart intelligence" nearly black on dark bg)
const { data: d2, info: i2 } = await sharp('public/images/logo.png')
  .raw()
  .toBuffer({ resolveWithObject: true })

const p2 = new Uint8Array(d2)
for (let i = 0; i < p2.length; i += 4) {
  if (p2[i + 3] > 32) {   // skip near-transparent edge pixels
    p2[i]     = 255        // R → white
    p2[i + 1] = 255        // G → white
    p2[i + 2] = 255        // B → white
  }
}
await sharp(Buffer.from(p2), {
  raw: { width: i2.width, height: i2.height, channels: 4 }
}).png().toFile('public/images/logo-white.png')
console.log('Done: public/images/logo-white.png')
