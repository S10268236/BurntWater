
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://scipoquest-68f1.restdb.io/rest/scipoquest-account-data",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": "678f5e8b718b1ad549f8147c",
        "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
