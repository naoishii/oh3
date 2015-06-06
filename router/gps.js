module.exports = function(app, DB) {
    var GPS = DB.GPS;

    app.get('/api/gps', function (req, res) {
        var ret = 'hige';
        GPS.find(function (err, data) {
            if (err) { ret = 'error'; }

            ret = data;
            res.type('json');
            res.send(ret);
        });
    });
    //// GETでもPOSTでもデータ作れるように。
    //app.post('/api/temp', function (req, res) {
    //    var ret = 'hige';
    //    var data = new Temperature({ temperature: req.body.temperature });

    //    data.save(function (err, data) {
    //        if (err) { ret = '[ERROR] insert failed'; }

    //        res.type('json');
    //        res.send('[SUCCESS] insert temperature');
    //    });
    //});
    app.get('/api/gps/create',function (req, res) {
        var ret = 'hige';
        var data = new GPS({ 
            lat: req.query.lat,
            latDirection: req.query.latDirection,
            lon: req.query.lon,
            lonDirection: req.query.lonDirection
        });

        data.save(function (err, data) {
            if (err) { ret = '[ERROR] insert failed'; }

            res.type('json');
            res.send('[SUCCESS] insert temperature');
        });
    });
}
