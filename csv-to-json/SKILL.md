---
name: csv-to-json
description: Converts CSV files to JSON format. Supports custom delimiters, nested objects using dot notation in headers, and automatic type parsing.
---

# CSV to JSON

This skill provides a deterministic script to convert CSV or TSV files into JSON format.

## Workflow

1. **Trigger**: User asks to convert a CSV to JSON or "convert this spreadsheet to a JSON array".
2. **Clarification**: If the delimiter is not standard (`,`), ask the user for it.
3. **Execution**: Use the `csv_to_json.cjs` script to perform the conversion.
4. **Output**: Provide the generated JSON or save it to a file as requested.

## Using the Script

Run the conversion script with Node.js:

```bash
node scripts/csv_to_json.cjs <file_path> [--delimiter=,] [--pretty] [--no-parse]
```

### Parameters:

- `<file_path>`: Path to the source CSV/TSV file.
- `--delimiter`: Character used to separate values (default: `,`). Use `\t` for TSV.
- `--pretty`: Output formatted (indented) JSON (default: minified).
- `--no-parse`: Disable automatic parsing of numbers and booleans (keep all values as strings).

### Nested Objects

The script supports "unflattening" based on header names. Use dot notation in the CSV header to create nested objects:

**Example CSV:**
```csv
id,user.name,user.email,active
1,John Doe,john@example.com,true
```

**Resulting JSON:**
```json
[
  {
    "id": 1,
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "active": true
  }
]
```

## Examples

**Convert a standard CSV with pretty printing:**

```bash
node scripts/csv_to_json.cjs data.csv --pretty
```

**Convert a TSV without type parsing:**

```bash
node scripts/csv_to_json.cjs data.tsv --delimiter=\t --no-parse
```
