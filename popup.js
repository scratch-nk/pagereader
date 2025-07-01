document.addEventListener('DOMContentLoaded', function() {
  const readButton = document.getElementById('readButton');
  const targetDiv = document.getElementById('targetDiv');
  const result = document.getElementById('result');

  readButton.addEventListener('click', async function() {
    const target = targetDiv.value.trim();
    
    if (!target) {
      result.textContent = 'Please enter a div ID or class name.';
      return;
    }

    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Execute content script to read the div
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: readDivContent,
        args: [target]
      });

      const content = results[0].result;
      
      if (content) {
        result.textContent = content;
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
  if (!div) {
    div = document.querySelector('div.' + target);
  }
  
  if (div) {
    return div.innerHTML;
  } else {
    return null;
  }
} 