const fs = require('fs');
const path = require('path');

function parseValue(value) {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    if (value === '' || value === null) return null;
    const num = Number(value);
    return isNaN(num) ? value : num;
}

function setNestedProperty(obj, keyPath, value) {
    const keys = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) {
            current[key] = {};
        }
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
}

function csvToJson(filePath, options = {}) {
    const { delimiter = ',', pretty = false, parse = true } = options;
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
    
    if (lines.length < 1) return [];

    const headers = lines[0].split(delimiter).map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(delimiter).map(v => v.trim());
        const row = {};
        headers.forEach((header, index) => {
            let value = values[index];
            if (parse) {
                value = parseValue(value);
            }
            if (header.includes('.')) {
                setNestedProperty(row, header, value);
            } else {
                row[header] = value;
            }
        });
        data.push(row);
    }

    return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('Usage: node csv_to_json.cjs <file_path> [--delimiter=,] [--pretty] [--no-parse]');
    process.exit(1);
}

const filePath = args[0];
const options = {
    delimiter: ',',
    pretty: false,
    parse: true
};

args.slice(1).forEach(arg => {
    if (arg.startsWith('--delimiter=')) {
        options.delimiter = arg.split('=')[1];
    } else if (arg === '--pretty') {
        options.pretty = true;
    } else if (arg === '--no-parse') {
        options.parse = false;
    }
});

try {
    const json = csvToJson(filePath, options);
    console.log(json);
} catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
}
