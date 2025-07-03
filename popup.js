document.getElementById('readButton').addEventListener('click', function() {
  const readButton = document.getElementById('readButton');
  const parentValue = document.getElementById('parentElement');
  const childValue = document.getElementById('childElement');
  const result = document.getElementById('result');

  readButton.addEventListener('click', async function() {
    const parentElem = parentValue.value.trim();
    const childElem = childValue.value.trim();
    
    if (!parentElem) {
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
        args:   [parentElem, childElem]
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
  // Step 1: Select all elements with class 'team-info'
  const parentElements = document.querySelectorAll('.' + parentSelector);
  const childElements = document.querySelectorAll('.' + childSelector);

   console.log ('parent, child elements', parentElements, childElements)

  if (parentElements.length === 0) {
    console.warn('No parent elements found.');
    return '<div class="match-detail">No team info available</div>';
  } else if (childElements.lenght === 0)  {
    console.warn('No child elements found.');
    return '<div class="match-detail">No child available</div>';
  }


  // Step 2: Combine outerHTML of each into a single string
  const contentHTML = Array.from(childElements)
    .map(el => (el.outerHTML))
    .join('\n');

  // Step 3: Wrap with a div called 'match-detail'
  const wrappedHTML = `<div class="match-detail">\n${contentHTML}\n</div>`;

  return wrappedHTML;
}

