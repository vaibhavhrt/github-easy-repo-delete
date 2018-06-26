var newTabId;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        chrome.tabs.create({
            url: "https://www.github.com/"+request.repo+"/settings?egrd=True",
            active: false
        }, function(tab){
            console.log("Created new tab with id: "+tab.id+" to delete the github repo: "+request.repo);
            test(tab.id, newTabId);
            console.log("Deleteing Github Repo ... Please Wait ...");
        });
        sendResponse({
            farewell: "Received link"+ request.repo
        });
    return true;
    }
);

function test(tabId){
    newTabId = tabId;
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.url === "https://github.com/" && tabId===newTabId){
        console.log("Github Repo Deleted Successfully, removing tab: "+newTabId);
        chrome.tabs.remove(newTabId);
    }
});