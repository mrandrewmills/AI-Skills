---
name: qr-code-generator
description: Generate QR code images from URLs or text strings. Use when the user needs a QR code for a website, search query, or contact info.
---

# QR Code Generator

## Overview

This skill enables the generation of QR codes for any given text or URL. It uses a Node.js script to create high-quality QR code images. Supported formats include PNG (default), SVG, JPEG, and WebP.

## Task: Generate QR Code

To generate a QR code, use the `scripts/generate_qr.cjs` script. The format is automatically detected from the file extension.

### Usage

```bash
node qr-code-generator/scripts/generate_qr.cjs "<text-or-url>" "[output-file-path]"
```

- **text-or-url**: The content to encode in the QR code (required).
- **output-file-path**: The path where the image will be saved (optional, defaults to `qrcode.png`). Supports `.png`, `.svg`, `.jpg`, `.webp`.

### Examples

- **URL (PNG)**: `node qr-code-generator/scripts/generate_qr.cjs "https://example.com" "example-qr.png"`
- **URL (SVG)**: `node qr-code-generator/scripts/generate_qr.cjs "https://example.com" "example-qr.svg"`
- **Search Query**: `node qr-code-generator/scripts/generate_qr.cjs "https://example.com/search?q=pandas" "search-qr.png"`
- **Plain Text**: `node qr-code-generator/scripts/generate_qr.cjs "Hello World" "hello.png"`

## Resources

### scripts/

- `generate_qr.cjs`: Main execution script using the `qrcode` library.
