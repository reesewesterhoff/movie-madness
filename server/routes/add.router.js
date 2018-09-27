// routes/add.router.js

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// post request to store a new movie in the database
router.post('/', (req, res) => {
    let movie = req.body;
    pool.query(`INSERT INTO "movie" ("name", "genre_id", "release_date", "run_time", "image")
    VALUES ($1, $2, $3, $4, $5);`, [movie.name, movie.genre_id, movie.release_date, movie.run_time, movie.image])
    .then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('error posting new movie to db', error);
        res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "movie" ORDER BY "id" DESC;`)
    .then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('error getting movies from database', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    pool.query(`DELETE FROM "movie"
    WHERE "id"=$1;`, [req.params.id])
    .then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error deleting movie from db', error);
        res.sendStatus(500);        
    });
});

module.exports = router;