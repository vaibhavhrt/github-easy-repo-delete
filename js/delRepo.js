$repoName=$("#rename_field").val();
console.log($repoName);
$(".Box-row:nth-child(4) .boxed-action").click();
$(".input-block").val($repoName);
$delBtn = $(".btn-danger:contains('I understand the consequences, delete this repository')").click();
