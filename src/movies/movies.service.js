const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = () => {
  return movies.map((movie) => {
    return {
      "review_id": movie.review_id,
      "content": movie.content,
      "score": movie.score,
      "created_at": movie.created_at,
      "updated_at": movie.updated_at,
      "critic_id": movie.critic_id,
      "movie_id": movie.movie_id,
      "critic": {
        "critic_id": movie.c_critic_id,
        "preferred_name": movie.preferred_name,
        "surname": movie.surname,
        "organization_name": movie.organization_name,
        "created_at": movie.c_created_at,
        "updated_at": movie.c_updated_at,
      },
    };
  });
};

function list() {
  return knex("movies").select("*");
}

function listShowings() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listTheaters(movie_id) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({ "mt.movie_id": movie_id, "mt.is_showing": true });
}

function listReviews(movie_id) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movie_id })
    .then((response) => {
      const reviewsList = [];
      response.forEach((item) => {
        const list = addCritic(item);
        reviewsList.push(list);
      });
      return reviewsList;
    });
}

module.exports = {
  list,
  listShowings,
  listReviews,
  listTheaters,
  read,
};
