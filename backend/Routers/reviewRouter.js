const express = require("express");
const reviewRouter = express.Router();

const {
    top3Reviews,
    getPlanReviews,
    createReview,
} = require('../Controllers/reviewController');

reviewRouter
.route('/top3')
.get(top3Reviews);

reviewRouter
.route('/:id')
.get(getPlanReviews);

reviewRouter
.route('/create/:planId')
.post(createReview)

module.exports = reviewRouter;






