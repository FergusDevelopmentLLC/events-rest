'use strict';

module.exports = (app) => {

  const event = require('../controllers/eventController')

  app.route('/getEvents/:minLng/:minLat/:maxLng/:maxLat/:startDate/:endDate')
    .get(event.getEvents)
}