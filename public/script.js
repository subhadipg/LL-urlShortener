alert('Welcome to Super Duper Useless Shortening Service');

document.getElementById('submitURL').onclick = (e) => {
    e.preventDefault();

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/getshortened');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    xhr.onload = function() {
        alert(xhr.response);
    };

    var info = JSON.stringify({inputUrl: document.getElementById("inputURL").value}); 
    xhr.send(info);
}

document.getElementById('submitHash').onclick = (e) => {
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    let requestString =  '/api/geturl?inputHash=' + document.getElementById("inputHash").value;
    // Note this could have been /geturl/inputHash.value as well, in that case you would use 
    // router.get('/geturl/:hash', function(req, res, next){
    //     urldbModel.findOne({'shortened' : req.params.hash}, (err, url) => {

    xhr.open('GET', requestString);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    xhr.onload = function() {
        alert(xhr.response);
    };

    xhr.send();
}