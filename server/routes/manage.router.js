// routes/manage.router.js

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    pool.query(`INSERT INTO "genre" ("name")
    VALUES $1`, [req.body.name])
    .then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding new genre to db', error);
        res.sendStatus(500);
    });
});

module.exports = router;