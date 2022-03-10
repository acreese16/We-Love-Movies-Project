const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});



function update(updatedReview) {
    return knex("reviews")
    .select("*")
    .where({"review_id": updatedReview.review_id})
    .update(updatedReview);
};


function destroy(reviewId) {
    return knex("reviews")
    .where({"review_id": reviewId})
    .del();
};

function updateReviews(reviewId, content) {
    // get review by id
    // if not found return an error
    // updateReview() function read the information given the review Id and the incoming request body
    // read the values out of the incoming model and commit those to database table

}


function updateReviewsOLD(reviewId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({"r.review_id": reviewId})
    .first()
    .then((response) => {
        const updatedReview = addCritic(response);
        updatedReview.critic_id = updatedReview.critic.critic_id;
        return updatedReview;
    });
}

function read(reviewId) {
    return knex("reviews")
    .select("*")
    .where({"review_id": reviewId})
    .first();
}

module.exports = {
    update,
    updateReviews,
    read,
    destroy,
}