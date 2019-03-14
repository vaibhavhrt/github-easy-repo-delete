import './img/icon16.png';
import './img/icon19.png';
import './img/icon48.png';
import './img/icon128.png';

const CONTENT_JS_FILE = 'content.bundle.js';

// Open index.html instead of popup on Browser Action Click
chrome.browserAction.onClicked.addListener((activeTab) => {
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});
