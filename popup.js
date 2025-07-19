// In popup.js or a similar entry point
document.addEventListener('DOMContentLoaded', async () => {
  // document.getElementById('readButton').addEventListener('click', function() {
  console.log('Read button clicked? ');
  console.log(document.getElementById("readButton")); // Should not be null

  // await connectToServer();
  const readButton = document.getElementById('readButton');
  const parentElem = document.getElementById('parentElement');
  const childElem = document.getElementById('childElement');
  const result = document.getElementById('result');

  readButton.addEventListener('click', async function() {
    const parenValue = parentElem.value.trim();
    const childValue = childElem.value.trim();
    
    if (!parenValue) {
      result.textContent = 'Please enter a div ID or class name.';
      return;
    }

    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Execute content script to read the div
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func:   getAllClassElements,
        args:   [parenValue, childValue]
      });

      const content = results[0].result;
      console.log (content);
      
      if (content) {
        result.textContent = prettyPrintHTML(content);
      } else {
        result.textContent = `No div found with ID or class "${target}"`;
      }
    } catch (error) {
      result.textContent = 'Error: ' + error.message;
    }
  });
});

// Function that will be injected into the page
/*
function readDivContent(target) {
  // Try to find by ID first, then by class
  let div = document.getElementById(target);
  console.log (target);
  if (!div) {
    div = document.querySelector('div.' + target);
  }
  
  if (div) {
    return div.outerHTML;
  } else {
    return null;
  }
} 
*/

function prettyPrintHTML(htmlString) {
  const tab = '  ';
  let result = '';
  let indent = '';

  htmlString
    .replace(/>\s*</g, '><') // Remove excessive whitespace
    .split(/></)
    .forEach(function (element) {
      if (element.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }

      result += indent + '<' + element + '>\n';

      if (
        element.match(/^<?\w[^>]*[^\/]$/) &&
        !element.startsWith('?') &&
        !element.startsWith('!')
      ) {
        indent += tab;
      }
    });

  return result.trim();
}


function getAllClassElements(parentSelector, childSelector) {
  // Select all parent elements with the given class
  const parentElements = document.querySelectorAll('.' + parentSelector);

  console.log('parent elements:', parentSelector, parentElements);

  if (parentElements.length === 0) {
    console.warn('No parent elements found.');
    return '<div class="match-detail">No team info available</div>';
  }

  let contentHTML = '';

  // For each parent, find child elements within it
  parentElements.forEach(parent => {
    const childElements = parent.querySelectorAll('.' + childSelector);
    if (childElements.length === 0) {
      contentHTML += `<div class="match-detail">No child available in parent: ${parentSelector}</div>\n`;
    } else {
      childElements.forEach(child => {
        const className = child.className || '(no class)';
        const content = child.textContent.trim();
        if (content) {
          contentHTML += `${className}: ${content}\n`;
        }
      });
    }
  });

  // Wrap with a div called 'match-detail'
  const wrappedHTML = `<pre class="match-detail">\n${contentHTML}\n</pre>`;

  return wrappedHTML;
}

