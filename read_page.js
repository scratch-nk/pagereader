const fs = require('fs');
const { JSDOM } = require('jsdom');

function match_div(html, target) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    // Look for a div with ID or class matching the target
    const div = document.querySelector(`div#${target}, div.${target}`);
    return div ? div.innerHTML : '';
}

function main() {
    try {
        const html = fs.readFileSync('wimb.home.html', 'utf8');
        const contents = match_div(html, 'match-box');
        console.log(contents);
    } catch (err) {
        console.error('Error reading file:', err.message);
    }
}

if (require.main === module) {
    main();
}

module.exports = { match_div };
