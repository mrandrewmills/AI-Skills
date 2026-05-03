const QRCode = require('qrcode');
const path = require('path');

async function run() {
  const text = process.argv[2];
  const outputPath = process.argv[3] || 'qrcode.png';
  const ext = path.extname(outputPath).toLowerCase().replace('.', '');
  
  if (!text) {
    console.log('Error: No text/URL provided for QR code generation.');
    process.exit(1);
  }

  const options = {};
  if (ext === 'svg' || ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'webp') {
    options.type = ext === 'jpg' ? 'jpeg' : ext;
  }

  try {
    await QRCode.toFile(outputPath, text, options);
    console.log(`Success: QR code (${ext || 'png'}) generated for "${text}" and saved to "${path.resolve(outputPath)}".`);
  } catch (err) {
    console.log(`Error: Failed to generate QR code. ${err.message}`);
    process.exit(1);
  }
}

run();
