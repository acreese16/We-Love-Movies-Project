const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const theaterService = require("./theaters.service");

async function list(req, res, next) {
  const {movieId} = req.params;
  let theater;

  if(movieId) {
    theater = await theaterService.listMovieId(movieId);
  } else {
    theater = await theaterService.list();
  }
  res.json({ data: theater });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
