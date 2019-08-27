var express = require('express'),
  app = express(),
  port = process.env.PORT || 8680,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
  
var routes = require('./api/routes/eventRoutes'); //importing route
routes(app); //register the route
app.listen(port);
  
console.log('Events restful API server started on: ' + port);  