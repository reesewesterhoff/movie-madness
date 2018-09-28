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

router.get('/', (req, res) => {
    pool.query(`SELECT "favorite_movie"."id", "favorite_movie"."name", "favorite_movie"."genre_id", "favorite_movie"."release_date", "favorite_movie"."run_time", "favorite_movie"."image", "genre"."name" AS "genre" 
    FROM "favorite_movie"
    JOIN "genre" ON "favorite_movie"."genre_id"="genre"."id"
    ORDER BY "id" DESC;`)
    .then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('error getting favorites from db', error);
        res.sendStatus(500);
    });
});



module.exports = router;