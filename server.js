// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static('./dist/prodisc'));

// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname,'/dist/prodisc/index.html'));
// });

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);



const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/prodisc'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/prodisc/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 8080);