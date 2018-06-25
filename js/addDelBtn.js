$("#user-repositories-list .border-bottom").each(function() {
    $link=$(this).find("h3 a").attr("href");
    $("<a href='"+$link+"/settings?egrd=True' target='_blank' class='egrd'>Delete Repo</button>").appendTo(this).children("div.f6.text-gray.mt-2")
});
