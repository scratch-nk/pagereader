# Page Reader Browser Extension

Jul 3: Reads all child content from Page when parent - child specified in box

TODO: 
. Send TLV to plugin from an Agenda

-- Claude README
A Chrome extension that allows you to read div content from any webpage.

## Installation

1. **Open Chrome** and go to `chrome://extensions/`
2. **Enable Developer mode** by toggling the switch in the top right
3. **Click "Load unpacked"** and select the folder containing these files:
   - `manifest.json`
   - `popup.html`
   - `popup.js`
   - `content.js`

## Usage

1. **Navigate to any webpage** (e.g., https://wimbledon.org)
2. **Click the Page Reader extension icon** in your browser toolbar
3. **Enter the div ID or class name** you want to read (e.g., "match-box")
4. **Click "Read Div Content"** to extract the content

## Features

- Works on any website
- Supports both ID and class selectors
- Clean, simple interface
- No permissions required beyond active tab access

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.js` - Popup logic and content extraction
- `content.js` - Content script injected into pages

## Example

If you want to read a div with `id="match-box"` or `class="match-box"`, just enter "match-box" in the input field and click the button.
