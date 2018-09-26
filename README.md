# movie-madness

### Database Queries
- CREATE TABLE "movie" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"genre" VARCHAR(100) NOT NULL,
	"release_date" DATE NOT NULL,
	"run_time" TIME NOT NULL,
	"image" VARCHAR
);

- CREATE TABLE "genre" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"genre_id" INT REFERENCES "movie"
);