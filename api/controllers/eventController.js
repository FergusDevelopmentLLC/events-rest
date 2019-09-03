const events = require('./data/mcdonalds.json');
const hikes = require('./data/summer2019hikes.json');

exports.getEvents = (req, res) => {

  let minLat = parseFloat(req.params.minLat)
  let maxLat = parseFloat(req.params.maxLat)
  let minLng = parseFloat(req.params.minLng)
  let maxLng = parseFloat(req.params.maxLng)
  let startDate = new Date(req.params.startDate)
  let endDate = new Date(req.params.endDate)

  let eventsCopy = Object.assign({}, events)
  
  let filteredFeatures = []

  for(f of eventsCopy.features) {

    let lat = parseFloat(f.properties.latitude)
    let lng = parseFloat(f.properties.longitude)
    let sDate = new Date(f.properties.startDate)
    let eDate = new Date(f.properties.endDate)

    delete f.geometry
    delete f.type
  
    if(
      lat >= minLat
      && lat <= maxLat
      && lng >= minLng
      && lng <= maxLng
      && sDate >= startDate
      && eDate <= endDate
      ) {
      filteredFeatures.push(f.properties)
    }
  }

  eventsCopy.features = filteredFeatures

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  res.json(eventsCopy.features)
}

exports.testMe = (req, res) => {

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  const currentTime = new Date()

  res.json(`hey, it works! The current time is: ${currentTime}`)
}

exports.getHikes = (req, res) => {

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  let hikesCopy = Object.assign({}, hikes)

  res.json(hikesCopy)
}