$link ='';
$("#user-repositories-list .border-bottom").each(function() {
    $link=$(this).find("h3 a").attr("href");
    $("<button data-repo="+$link+" class='egrd'>Delete Repo</button>").appendTo(this).children("div.f6.text-gray.mt-2")
});
$('button.egrd').on('click', function(){
    $link = $(this).attr("data-repo");
    console.log("Button clicked, link sent to background :" + $link);
    chrome.runtime.sendMessage({repo: $link}, function(response){
        console.log(response.farewell);
    });
});
