window.onload = () => {
    $('#shorten').click(function () {
        $.post('/api/shorten', {
            url: $("#inputUrl").val()
        }, (result) => {
            console.log(result);
            $("#results").append("<tr><td>" +
                `<a href="${result.url}">${result.url}</a></td>` +
                `<td><a href="${window.location}${result.shortUrl}">${window.location}${result.shortUrl}</a>` +
                "</td></tr>");
        });
    });
};