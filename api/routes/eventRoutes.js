'use strict';

module.exports = (app) => {

  const event = require('../controllers/eventController')

  app.route('/getEvents/:minLng/:minLat/:maxLng/:maxLat/:start_date/:end_date')
    .get(event.getEvents)

  app.route('/getLocationsGeoJson/:minLng/:minLat/:maxLng/:maxLat')
    .get(event.getLocationsGeoJson)

  app.route('/testMe')
    .get(event.testMe)

  app.route('/hikes')
    .get(event.getHikes)

  app.route('/blm')
    .get(event.getBlm)

  app.route('/mine_projects')
    .get(event.getMineProjects)
    
}