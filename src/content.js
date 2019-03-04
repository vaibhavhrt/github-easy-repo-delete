const url = window.location.href;

// Delete Repo
const delRepoRegex = /https:\/\/github\.com\/.*\/.*\/settings\?egrd=True/;
if(delRepoRegex.test(url)){
    const repoName = document.getElementById('rename-field').value;
    document.querySelector('.Box-row:nth-child(4) .boxed-action').click();
    document.getElementsByClassName('input-block')[1].value = repoName;
    Array.from(document.getElementsByClassName('btn-danger')).forEach(elem => {
        if(elem.textContent === 'I understand the consequences, delete this repository'){
            elem.removeAttribute('disabled');
            elem.click();
        }
    });
}

// Add Delete Button
const repositoriesPageRegex = /https:\/\/github\.com\/.*\?.*tab=repositories/;
if(repositoriesPageRegex.test(url)){
    //add delete all selected repos button
    let deleteAllButton = document.createElement('button');
    deleteAllButton.classList.add('egrd', 'btn', 'btn-sm', 'btn-danger');
    deleteAllButton.innerText = 'Delete Selected Repos';
    let deleteAllDiv = document.createElement('div');
    deleteAllDiv.classList.add('border-bottom', 'border-gray-dark', 'py-3');
    deleteAllDiv.appendChild(deleteAllButton);
    let referenceNode = document.querySelector('.border-bottom.border-gray-dark.py-3');
    referenceNode.parentNode.insertBefore(deleteAllDiv, referenceNode.nextSibling);

    document.querySelectorAll('#user-repositories-list .border-bottom').forEach(repo => {
        let link = repo.querySelector('h3 a').href;
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList.add('egrd');
        checkBox.value = link;
        repo.appendChild(checkBox);
        let labelSpan = document.createElement('span');
        labelSpan.classList.add('label');
        labelSpan.innerText = 'Delete Repo';
        labelSpan.style.color = 'red';
        repo.appendChild(labelSpan);
    });

    //get list of selected repos
    var links = [];
    document.querySelector('button.egrd').addEventListener('click', () => {
        document.querySelectorAll('.egrd[type="checkbox"]:checked').forEach(elem => {
            links.push(elem.value);
            console.log(elem.value);
        });
        chrome.runtime.sendMessage({repo: links}, function(response){
            console.log(response.farewell);
        });
        links = [];
    });
    
    //listen for sucussful deletion of repos
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.greeting === 'DEL OK'){
                console.log('Successfully deleted all repos!');
                sendResponse({farewell: 'THANKS'});
            }
        }
    );
}
