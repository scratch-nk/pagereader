// Content script that runs on every page
// This can be used for additional functionality if needed

console.log('Page Reader extension loaded');

// Listen for messages from popup (if needed in the future)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'readDiv') {
    const div = document.getElementById(request.target) || document.querySelector('div.' + request.target);
    sendResponse({ content: div ? div.innerHTML : null });
  }
}); 