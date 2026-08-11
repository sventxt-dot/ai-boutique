import sharp from 'sharp'

// Browser favicon (32x32)
await sharp('public/images/FavIcon40x40.png')
  .resize(32, 32)
  .toFile('app/favicon.ico')

// Apple touch icon (180x180)
await sharp('public/images/FavIcon40x40.png')
  .resize(180, 180)
  .toFile('app/apple-icon.png')

// Android icon (192x192)
await sharp('public/images/FavIcon40x40.png')
  .resize(192, 192)
  .toFile('app/icon.png')

console.log('Favicons generated')
