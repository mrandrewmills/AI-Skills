---
name: csv-to-markdown
description: Convert CSV/TSV data into Markdown tables. Use when the user wants to format tabular data from a file into a Markdown document.
---

# CSV to Markdown

This skill provides a deterministic script to convert CSV or TSV files into Markdown tables.

## Workflow

1. **Trigger**: User asks to convert a CSV to Markdown or "format this spreadsheet as a table".
2. **Clarification**: If the alignment (left, center, right) isn't specified, ask the user.
3. **Execution**: Use the `csv_to_md.cjs` script to perform the conversion.
4. **Output**: Provide the generated Markdown table to the user.

## Using the Script

Run the conversion script with Node.js:

```bash
node scripts/csv_to_md.cjs <file_path> [--delimiter=,] [--alignment=l,c,r]
```

### Parameters:

- `<file_path>`: Path to the source CSV/TSV file.
- `--delimiter`: Character used to separate values (default: `,`). Use `\t` for TSV.
- `--alignment`: Alignment for columns. 
  - Single value for all columns (e.g., `--alignment=left`).
  - Comma-separated list for specific columns (e.g., `--alignment=l,c,r`).
  - Values: `l`/`left`, `c`/`center`, `r`/`right`.

## Examples

**Convert a standard CSV with center alignment:**

```bash
node scripts/csv_to_md.cjs data.csv --alignment=center
```

**Convert a TSV with mixed alignment:**

```bash
node scripts/csv_to_md.cjs data.tsv --delimiter=\t --alignment=l,c,r
```
