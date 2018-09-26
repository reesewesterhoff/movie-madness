// routes/add.router.js

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// post request to store a new movie in the database
router.post('/', (req, res) => {
    let movie = req.body;
    pool.query(`INSERT INTO "movie" ("name", "genre", "release_date", "run_time", "image")
    VALUES ($1, $2, $3, $4, $5);`, [movie.name, movie.genre, movie.release_date, movie.run_time, movie.image])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error posting new movie to db', error);
            res.sendStatus(500);
        });
});
