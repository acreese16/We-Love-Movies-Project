const movieService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const {is_showing} = req.query.is_showing;
    console.log(is_showing);
    let movieList;

    if(is_showing) {
        movieList = await movieService.listShowings();
    } else {
        movieList = await movieService.list();
    }
   
    res.json({data: movieList});
}

async function read(req, res, next) {
    res.json({data: await res.locals.movie});
}

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    const movie = await movieService.read(movieId);

    if (movieId) {
        res.locals.movie = movie;
        return next();
    }
    next({status: 404, message: "Movie cannot be found."});
};

async function listTheaters(req, res, next) {
    const {movieId} = req.params;
    const theaters = await movieService.listTheaters(movieId);
    res.json({data: theaters})
};

async function listReviews(req, res, next) {
    const {movieId} = req.params;
    const reviews = await movieService.listReviews(movieId);
    res.json({data: reviews})
}

module.exports = {
    list: asyncErrorBoundary(list),
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    read: [asyncErrorBoundary(movieExists), read],
    movieExists,
}