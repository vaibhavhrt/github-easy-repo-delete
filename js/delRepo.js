var $repoName=$("#rename_field").val();
$(".Box-row:nth-child(4) .boxed-action").click();
$(".input-block").val($repoName);
$(".btn-danger:contains('I understand the consequences, delete this repository')").removeAttr("disabled").click();
