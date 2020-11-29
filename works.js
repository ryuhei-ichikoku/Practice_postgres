var express = require('express');
var router = express.Router();
var pg = require('pg');

var pool = new pg.Pool({
    database: 'test',
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
});

// GET  http://localhost:3000/api/v1/works/test
router.get('/', function (req, res) {

    var SQL = `SELECT password FROM userkanrihyo WHERE userid=\'${req.query.id}\'`;

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {
                res.send(result.rows[0].password);
            });
        }
    });

});

//routerをモジュールとして扱う準備
module.exports = router;