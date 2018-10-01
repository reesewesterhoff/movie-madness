// routes/favorites.router.js

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// post request to database to create a new favorite movie
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
// get request to database for all favorites
router.get('/', (req, res) => {
    pool.query(`SELECT DISTINCT ON ("favorite_movie"."name") "favorite_movie"."name", "favorite_movie"."id", "favorite_movie"."genre_id", 
                "favorite_movie"."release_date", "favorite_movie"."run_time", "favorite_movie"."image", "genre"."name" AS "genre" 
                FROM "favorite_movie"
                JOIN "genre" ON "favorite_movie"."genre_id"="genre"."id";`) // order movies by most recently added
    .then(results => {
        res.send(results.rows); // send favorites to server
    }).catch(error => {
        console.log('error getting favorites from db', error);
        res.sendStatus(500);
    });
});
// delete request to database, find favorite by id and delete
router.delete('/:id', (req, res) => {
    pool.query(`DELETE FROM "favorite_movie"
    WHERE "id"=$1;`, [req.params.id])
    .then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error deleting movie from db', error);
        res.sendStatus(500);        
    });
});

// exports
module.exports = router;