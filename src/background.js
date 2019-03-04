import './img/icon16.png';
import './img/icon19.png';
import './img/icon48.png';
import './img/icon128.png';

const CONTENT_JS_FILE = 'content.bundle.js';

// Open index.html instead of popup on Browser Action Click
chrome.browserAction.onClicked.addListener((activeTab) => {
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});

// Insert content Script on page load
const githubUrlRegex = /https:\/\/github\.com.*/;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status==='complete' && githubUrlRegex.test(tab.url)){
        chrome.tabs.executeScript(tabId, { file: CONTENT_JS_FILE });
    }
});

var newTabId;
var linksToDelete = [];
var i;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        linksToDelete = request.repo;
        i = 0;
        deleteRepos(linksToDelete[i]);
        sendResponse({
            farewell: `Received links Deleting ${linksToDelete.length} repos`,
        });
        return true;
    }
);

//delete one repo at a time
function deleteRepos(link){
    chrome.tabs.create({
        url: `${link}/settings?egrd=True`,
        active: false,
    }, function(tab){
        console.log(`Created new tab with id: ${tab.id} to delete the github repo: ${link}`);
        getTabId(tab.id, newTabId);
        console.log('Deleteing Github Repo ... Please Wait ...');
    });
}

//once a repo a deleted, call function to delete next repo
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
    if(changeInfo.url === 'https://github.com/' && tabId===newTabId){
        console.log(`Github Repo Deleted Successfully, removing tab: ${newTabId}`);
        chrome.tabs.remove(newTabId);
        //Check if there is any more repos to deleted
        if(i < linksToDelete.length-1){
            i+=1;
            deleteRepos(linksToDelete[i]);
        }
        //send message that all repos successfully deleted
        else{
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {greeting: 'DEL OK'}, function(response) {
                    console.log(response.farewell);
                });
            });
        }
    }
});

//get tabId of newly creted tab
function getTabId(tabId){
    newTabId = tabId;
}
