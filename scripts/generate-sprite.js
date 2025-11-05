const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const outputFile = path.join(__dirname, '../public/images/company-logos-sprite.svg');
const pagesConfigPath = path.join(__dirname, '../lib/config/pages.tsx');

const extractLogoFilesFromConfig = () => {
  if (!fs.existsSync(pagesConfigPath)) {
    console.warn(`Warning: pages config not found at ${pagesConfigPath}`);
    return [];
  }

  const configContent = fs.readFileSync(pagesConfigPath, 'utf8');
  const developersMatch = configContent.match(/developers:\s*{[\s\S]*?logos:\s*\[([\s\S]*?)\]\s*,\s*}/);

  if (!developersMatch) {
    console.warn('Warning: Unable to locate developers logos in config; falling back to empty list.');
    return [];
  }

  const logosSection = developersMatch[1];
  const matches = logosSection.matchAll(/logo:\s*['"]([^'"]+)['"]/g);

  const seen = new Set();
  const logos = [];

  for (const match of matches) {
    const logoPath = match[1];
    if (!logoPath.startsWith('/images/')) {
      continue;
    }

    const fileName = path.basename(logoPath);

    if (!fileName.toLowerCase().endsWith('.svg') || seen.has(fileName)) {
      continue;
    }

    seen.add(fileName);
    logos.push(fileName);
  }

  return logos;
};

// Derive the logo list from the single source of truth in pages config
const logoFiles = extractLogoFilesFromConfig();

if (!logoFiles.length) {
  console.warn('No logos discovered from config; sprite generation will not output any symbols.');
}

console.log('Generating SVG sprite sheet...');

let symbols = [];

logoFiles.forEach((file) => {
  const filePath = path.join(imagesDir, file);

  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: ${file} not found, skipping...`);
    return;
  }

  const svgContent = fs.readFileSync(filePath, 'utf8');

  // Extract viewBox and paths from the SVG
  const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 100';

  // Extract everything between <svg> and </svg> tags
  const contentMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const content = contentMatch ? contentMatch[1].trim() : '';

  // Get the logo name without extension
  const logoName = file.replace('.svg', '');

  // Create a symbol for this logo
  symbols.push(`  <symbol id="logo-${logoName}" viewBox="${viewBox}">
${content}
  </symbol>`);

  console.log(`✓ Added ${logoName}`);
});

// Create the sprite sheet SVG
const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${symbols.join('\n')}
</svg>`;

// Write the sprite file
fs.writeFileSync(outputFile, spriteContent);

console.log(`\n✅ Sprite sheet generated successfully!`);
console.log(`📁 Location: ${outputFile}`);
console.log(`📊 Total logos: ${symbols.length}`);
