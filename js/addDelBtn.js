//add delete all selected repos button
$('<div class="border-bottom border-gray-dark py-3"><button class="egrd btn btn-sm btn-danger">Delete Selected Repos</button></div>').insertAfter('.border-bottom.border-gray-dark.py-3');

$link ='';
$("#user-repositories-list .border-bottom").each(function() {
    $link=$(this).find("h3 a").attr("href");
    $("<input type='checkbox' value="+$link+" class='egrd'/>").appendTo(this);
    $('<span class="label" style="color: red">Delete Repo</span>').appendTo(this);
});

//get list of selected repos
$links = [];
$('button.egrd').on('click', function(){
    $('.egrd:checkbox:checked').each(function(){
        $l = $(this).val();
        $links.push($l);
        console.log($l);
    });
    console.log($links);
    //$link = $(this).attr("data-repo");
    //console.log("Button clicked, link sent to background :" + $link);
    chrome.runtime.sendMessage({repo: $links}, function(response){
        console.log(response.farewell);
    });
    $links = [];
});

//listen for sucussful deletion of repos
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "DEL OK"){
            console.log("Successfully deleted all repos!")
            sendResponse({farewell: "THANKS"});
        }
});
