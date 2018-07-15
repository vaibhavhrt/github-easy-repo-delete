var newTabId;
var linksToDelete = [];
var i;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        linksToDelete = request.repo;
        i = 0;
        deleteRepos(linksToDelete[i]);
        sendResponse({
            farewell: "Received links Deleting " + linksToDelete.length + " repos"
        });
    return true;
    }
);

//delete one repo at a time
function deleteRepos(link){
    chrome.tabs.create({
        url: "https://www.github.com/"+link+"/settings?egrd=True",
        active: false
    }, function(tab){
        console.log("Created new tab with id: "+tab.id+" to delete the github repo: "+link);
        getTabId(tab.id, newTabId);
        console.log("Deleteing Github Repo ... Please Wait ...");
    });
}

//once a repo a deleted, call function to delete next repo
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.url === "https://github.com/" && tabId===newTabId){
        console.log("Github Repo Deleted Successfully, removing tab: "+newTabId);
        chrome.tabs.remove(newTabId);
        //Check if there is any more repos to deleted
        if(i < linksToDelete.length-1){
            i+=1;
            deleteRepos(linksToDelete[i])
        }
        //send message that all repos successfully deleted
        else{
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {greeting: "DEL OK"}, function(response) {
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
