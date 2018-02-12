window.onload = () => {
    $('#submitURL').click(function () {
        $.post('/api/url', {
            url: $("#inputURL").val()
        }, console.log);
    });

    $('#submitHash').click(function () {
        $.get('/api/url?shortUrl=' + $("#inputHash").val(), console.log);
    });
};