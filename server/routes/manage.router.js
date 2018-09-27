// routes/manage.router.js

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    pool.query(`INSERT INTO "genre" ("name")
    VALUES ($1);`, [req.body.name])
    .then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding new genre to db', error);
        res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
    pool.query(`SELECT "genre"."id", "genre"."name", COUNT("movie"."genre_id") FROM "genre"
                LEFT OUTER JOIN "movie" ON "movie"."genre_id"="genre"."id"
                GROUP BY "genre"."id";`)
    .then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('error getting genres from db', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    pool.query(`DELETE FROM "genre"
    WHERE "id"=$1;`, [req.params.id])
    .then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error deleting genre from database', error);
        res.sendStatus(500);
    });
});

module.exports = router;