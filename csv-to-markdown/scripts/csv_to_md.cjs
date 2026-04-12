const fs = require('fs');
const path = require('path');

function parseCSV(content, delimiter = ',') {
  // Remove BOM if present and normalize line endings
  const cleanContent = content.replace(/^\uFEFF/, '').trim();
  const lines = cleanContent.split(/\r?\n/);
  return lines.map(line => {
    let cells = [];
    let currentCell = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim());
    return cells;
  });
}

function generateMarkdownTable(rows, alignment = '') {
  if (rows.length === 0) return '';
  const headers = rows[0];
  const data = rows.slice(1);
  const colCount = headers.length;

  let alignArray = new Array(colCount).fill('---');
  if (alignment) {
    const aligns = alignment.split(',').map(a => a.trim().toLowerCase());
    for (let i = 0; i < colCount; i++) {
      const a = aligns[i] || aligns[0]; // Use first if fewer provided
      if (a === 'l' || a === 'left') alignArray[i] = ':---';
      else if (a === 'r' || a === 'right') alignArray[i] = '---:';
      else if (a === 'c' || a === 'center') alignArray[i] = ':---:';
    }
  }

  const headerRow = `| ${headers.join(' | ')} |`;
  const alignRow = `| ${alignArray.join(' | ')} |`;
  const dataRows = data.map(row => `| ${row.join(' | ')} |`).join('\n');

  return `${headerRow}\n${alignRow}\n${dataRows}`;
}

const args = process.argv.slice(2);
const filePath = args.find(a => !a.startsWith('--'));
const delimiterArg = args.find(a => a.startsWith('--delimiter='));
const alignmentArg = args.find(a => a.startsWith('--alignment='));

if (!filePath) {
  console.error('Usage: node csv_to_md.cjs <file_path> [--delimiter=,] [--alignment=l,c,r]');
  process.exit(1);
}

try {
  const content = fs.readFileSync(path.resolve(filePath), 'utf8');
  const delimiter = delimiterArg ? delimiterArg.split('=')[1] : ',';
  const alignment = alignmentArg ? alignmentArg.split('=')[1] : '';
  const rows = parseCSV(content, delimiter);
  process.stdout.write(generateMarkdownTable(rows, alignment) + '\n');
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
