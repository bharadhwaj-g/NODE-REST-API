// Load all necessary packages we need.

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configure app to use body parser, to parse post request data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup port, read from env if not available take default
const port = process.env.PORT || 8080;


// Routing
const router = express.Router();

router.get('/', function (req, res) {
  res.json({message : 'NodeJS Rest API has been setup.'});
});

// Prefixed the root with API
app.use('/api', router);

// Start the server by listening on port
app.listen(port);
console.log('App has been started.');