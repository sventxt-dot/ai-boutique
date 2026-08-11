import sharp from 'sharp'

// favicon.ico (32x32)
await sharp('public/images/AiB_Logo_Trans-Weiss.png')
  .resize(32, 32)
  .toFile('app/favicon.ico')

// apple-touch-icon (180x180)
await sharp('public/images/AiB_Logo_Trans-Weiss.png')
  .resize(180, 180)
  .toFile('app/apple-icon.png')

// icon 192x192 for android
await sharp('public/images/AiB_Logo_Trans-Weiss.png')
  .resize(192, 192)
  .toFile('app/icon.png')

console.log('Favicons generated')
