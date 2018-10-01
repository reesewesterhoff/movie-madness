# movie-madness

## Description
This is a movie application that one might use to keep track of their favorite movies or movies they want to watch. On the home page there is a get request to themoviedb api for popular movies. They are displayed using angular cards. On the My Movies view users are able to add movies by inputting information about the movie. Those movies are also displayed with angular cards and have icons on the bottom of the card. Users have the option to thumbs up, thumbs down, favorite, or delete a movie. Currently, the thumbs up and thumbs down icons simply toggle a color indicating that the user likes or does not like that movie. The favorite icon (heart) takes that movie and posts it over to the favorites view. The delete icon (trash can) deletes the movie from the DOM and the database. The Favorites view displays all of a users favorited movies with the option to delete any movie they choose.

## Technologies Used
- PostgresQL
- Express
- Node
- AngularJS
- Angular Material
- Moment.js

### Database Queries
- database name: movie_collection

CREATE TABLE "movie" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"genre_id" INT REFERENCES "genre" NOT NULL,
	"release_date" DATE NOT NULL,
	"run_time" TIME NOT NULL,
	"image" VARCHAR,
	"thumbs_down" BOOLEAN,
	"thumbs_up" BOOLEAN,
	"favorite" BOOLEAN
);

CREATE TABLE "genre" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255)
);

INSERT INTO "movie" ("name", "genre_id", "release_date", "run_time", "image")
VALUES ('The Matrix', 2, '1999/03/31', '02:16', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg');

SELECT * FROM "movie";

DELETE FROM "movie"
WHERE "id"=4;

INSERT INTO "genre" ("name")
VALUES ('Suspense'), ('Sci-Fi'), ('Adventure'), ('Horror'), ('Musical');

SELECT * FROM "genre";

SELECT "genre"."id","genre"."name", COUNT("movie"."genre_id"), "movie"."genre_id" FROM "genre"
LEFT OUTER JOIN "movie" ON "movie"."genre_id"="genre"."id"
GROUP BY "genre"."id", "movie"."genre_id"
ORDER BY "genre"."name";

SELECT "movie"."id", "movie"."name", "movie"."genre_id", "movie"."release_date", "movie"."run_time", "movie"."image", "genre"."name" AS "genre" 
FROM "movie"
JOIN "genre" ON "movie"."genre_id"="genre"."id";

CREATE TABLE "favorite_movie" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"genre_id" INT REFERENCES "genre" NOT NULL,
	"release_date" DATE NOT NULL,
	"run_time" TIME NOT NULL,
	"image" VARCHAR
);

SELECT * FROM "favorite_movie";

INSERT INTO "movie" ("name", "genre_id", "release_date", "run_time", "image", "thumbs_down", "thumbs_up", "favorite")
VALUES ('The Matrix', 2, '1999/03/31', '02:16', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg', FALSE, FALSE, FALSE),
('The Princess Bride', 3, '1987/10/09', '01:38', 'https://m.media-amazon.com/images/M/MV5BMGM4M2Q5N2MtNThkZS00NTc1LTk1NTItNWEyZjJjNDRmNDk5XkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_SY1000_CR0,0,676,1000_AL_.jpg', FALSE, FALSE, FALSE),
('Alien', 2, '1979/06/22', '01:56', 'https://m.media-amazon.com/images/M/MV5BMmQ2MmU3NzktZjAxOC00ZDZhLTk4YzEtMDMyMzcxY2IwMDAyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,678,1000_AL_.jpg', FALSE, FALSE, FALSE),
('La La Land', 5, '2016/12/25', '02:08', 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SY1000_SX675_AL_.jpg', FALSE, FALSE, FALSE);