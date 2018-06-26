chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        sendResponse({farewell: "Received link"+ request.repo});
        chrome.tabs.create({
            url: "https://www.github.com/"+request.repo+"/settings?egrd=True",
            active: false
        });
    return true;
    }
);
