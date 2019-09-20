const events = require('./data/mcdonalds.json');
const hikes = require('./data/summer2019hikes.json');
const blm = require('./data/mine/blm10.json');
const mines = require('./data/mine/NON_POINT_MINE_PROJECTS.json');
const donors = require('./data/mine/donor201909.json');
const pass = require('./data/password/password.json');

exports.getEvents = (req, res) => {

  let minLat = parseFloat(req.params.minLat)
  let maxLat = parseFloat(req.params.maxLat)
  let minLng = parseFloat(req.params.minLng)
  let maxLng = parseFloat(req.params.maxLng)
  let start_date = new Date(req.params.start_date)
  let end_date = new Date(req.params.end_date)

  let eventsCopy = Object.assign({}, events)
  
  let filteredFeatures = []

  for(f of eventsCopy.features) {

    let lat = parseFloat(f.properties.latitude)
    let lng = parseFloat(f.properties.longitude)
    let sDate = new Date(f.properties.start_date)
    let eDate = new Date(f.properties.end_date)

    delete f.geometry
    delete f.type
    
    f.properties.name = `McDowell's - ${f.properties.address} ${f.properties.city}, ${f.properties.state_province}`
    f.properties.counter = `${Math.floor(Math.random() * 10) + 1}/10`
    f.properties.event_description = f.properties.event_description.replace(/McDonald/g, 'McDowell')

    if(
      lat >= minLat
      && lat <= maxLat
      && lng >= minLng
      && lng <= maxLng
      && sDate >= start_date
      && eDate <= end_date
      ) {
      filteredFeatures.push(f.properties)
    }
  }

  eventsCopy.features = filteredFeatures

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  res.json(eventsCopy.features)
}


exports.getLocationsGeoJson = (req, res) => {

  let minLat = parseFloat(req.params.minLat)
  let maxLat = parseFloat(req.params.maxLat)
  let minLng = parseFloat(req.params.minLng)
  let maxLng = parseFloat(req.params.maxLng)

  let eventsCopy = Object.assign({}, events)
  eventsCopy.name = "McDowell's"
  
  let filteredFeatures = []

  for(f of eventsCopy.features) {

    let lat = parseFloat(f.properties.latitude)
    let lng = parseFloat(f.properties.longitude)

    f.properties.name = `McDowell's - ${f.properties.address} ${f.properties.city}, ${f.properties.state_province}`
    f.properties.counter = `${Math.floor(Math.random() * 10) + 1}/10`
    f.properties.event_description = f.properties.event_description.replace(/McDonald/g, 'McDowell')

    if(
      lat >= minLat
      && lat <= maxLat
      && lng >= minLng
      && lng <= maxLng
      ) {
      filteredFeatures.push(f)
    }
  }

  eventsCopy.features = filteredFeatures

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  res.json(eventsCopy)
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

exports.getBlm = (req, res) => {

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  let blmCopy = Object.assign({}, blm)

  res.json(blmCopy)
}

exports.getMineProjects = (req, res) => {

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  let minesCopy = Object.assign({}, mines)

  res.json(minesCopy)
}

exports.getDonors = (req, res) => {
  
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  if(pass.password != req.params.password) {
    res.json([])
    return;
  }

  res.json([])
  return;

  let donorsCopy = Object.assign({}, donors)

  for(f of donorsCopy.features) {
    if(!f.properties.Age) f.properties.Age = 0
    if(!f.properties.Planned_Giving_Bequest) f.properties.Planned_Giving_Bequest = 0
    if(!f.properties.Lifetime_Gift_Count) f.properties.Lifetime_Gift_Count = 0
  }

  // let copy = []

  // for(f of donorsCopy.features) {
  //   if(!f.properties.Age == 0)
  //     copy.push(f)
  // }

  // donorsCopy.features = copy

  res.json(donorsCopy)
}

