// routes/add.router.js

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// post request to store a new movie in the database
router.post('/', (req, res) => {
    let movie = req.body;
    pool.query(`INSERT INTO "movie" ("name", "genre_id", "release_date", "run_time", "image",
                "thumbs_down", "thumbs_up", "favorite")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, 
                [movie.name, movie.genre_id, movie.release_date, movie.run_time, movie.image, 
                movie.thumbs_down, movie.thumbs_up, movie.favorite])
    .then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('error posting new movie to db', error);
        res.sendStatus(500);
    });
});
// get request to database for all movies
router.get('/', (req, res) => {
    pool.query(`SELECT "movie"."id", "movie"."name", "movie"."genre_id", "movie"."release_date", "movie"."run_time", "movie"."image", "genre"."name" AS "genre" 
                FROM "movie"
                JOIN "genre" ON "movie"."genre_id"="genre"."id"
                ORDER BY "id" DESC;`)
    .then(results => {
        res.send(results.rows); // send movies to server
    }).catch(error => {
        console.log('error getting movies from database', error);
        res.sendStatus(500);
    });
});
// delete request to database, find movie by id and delete
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
// exports
module.exports = router;