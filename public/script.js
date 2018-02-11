alert('script');

document.getElementById('submit').onclick = function(e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/getfullurl');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    xhr.onload = function() {
        alert(xhr.response);
    };

    xhr.send(JSON.stringify({inputUrl: document.getElementById("inputURL").value}));
}