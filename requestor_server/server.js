// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');

const app = express();

const ecc = require('eosjs-ecc')

app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/verify', function(request, response) {
  let body = request.body;
  console.log(body);

  let signature = body.signature;
  let isVerified = false;
  try {
    isVerified = ecc.verify(signature, "message", "EOS6pkWwj1fmTziiS8gGxMFuVHbgL7UbCZ87ufKak6ogrNwuVyb3Q");
  } catch(error) {
    console.log(error);
  }

  console.log(isVerified);
  response.json({result: isVerified});
});

app.post('/fileupload', function(req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let oldpath = files.filetoupload.path;
    let newpath = '/Users/MatthewMorrison/Desktop/SecuriShare/' + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
