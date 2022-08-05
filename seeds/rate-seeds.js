const {Rate} = require('../models');

const rateData = [];

const seedRates = () => Rate.bulkCreate(rateData);

module.exports = seedRates;