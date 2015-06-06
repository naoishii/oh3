var request = require('request');

var url = 'http://210.140.160.143:8080/api';
var count = 0;
var timer = setInterval(function () {
    request(url, function (err, resp, body) {
        if (err) {
            clearInterval(timer);
        }

        console.log(count,JSON.parse(body).blid);
        count += 1;
    });


}, 100);
