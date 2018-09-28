// routes/favorites.router.js

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    let favoriteMovie = req.body;
    pool.query(`INSERT INTO "favorite_movie" ("name", "genre_id", "release_date", "run_time", "image")
    VALUES ($1, $2, $3, $4, $5);`, [favoriteMovie.name, favoriteMovie.genre_id, favoriteMovie.release_date, favoriteMovie.run_time, favoriteMovie.image])
    .then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding new favorite movie to db', error);
        res.sendStatus(500);
    });
});



module.exports = router;