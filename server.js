// Load all necessary packages we need.

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

// Load necessay models
const User = require('./app/models/user');

// Configure app to use body parser, to parse post request data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup port, read from env if not available take default
const port = process.env.PORT || 8080;

// Create mongoose connection
mongoose.connect('mongodb://root:qwerty123@ds251210.mlab.com:51210/bhar_node_rest_api');

// Routing
const router = express.Router();

// Middle ware, it will call before route, so here we can handle the request, or log the request etc
router.use('/', function (req, res, next){
  console.log('Route has been in middle ware.');
  next();
});

router.get('/', function (req, res) {
  res.json({message : 'NodeJS Rest API has been setup.'});
});

// Create app

router.route('/users')
      .post(function(req, res) {
        const user = new User(); // Create new instance for User
        user.name = req.body.name;
        user.save(function(err) {
          if (err) {
            res.send(err);
          }
          res.json({message:'User has been created.'})
        });
      })
      .get(function (req, res) {
        User.find(function(err, bears) {
          if (err) {
            res.send(err);
          }
          res.json(bears);
        });
      });


// Prefixed the root with API
app.use('/api', router);

// Start the server by listening on port
app.listen(port);
console.log('App has been started.');