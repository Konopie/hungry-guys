const {Rate} = require('../models');

const rateData = [
    {
        user_id: 2,
        post_id: 1,
        rating: 4
    },
    {
        user_id: 5,
        post_id: 1,
        rating: 5
    },
    {
        user_id: 1,
        post_id: 2,
        rating: 3
    },
    {
        user_id: 3,
        post_id: 2,
        rating: 2
    },
    {
        user_id: 4,
        post_id: 3,
        rating: 4
    },
    {
        user_id: 5,
        post_id: 3,
        rating: 5
    },
    {
        user_id: 5,
        post_id: 4,
        rating: 3
    },
    {
        user_id: 2,
        post_id: 4,
        rating: 5
    },
    {
        user_id: 3,
        post_id: 5,
        rating: 2
    },
    {
        user_id: 1,
        post_id: 6,
        rating: 1
    }
];

const seedRates = () => Rate.bulkCreate(rateData);

module.exports = seedRates;