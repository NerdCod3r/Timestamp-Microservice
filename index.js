// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// The API endpoint for default usage
app.get("/api/", function(req, res) {
  res.json({"unix": parseInt(new Date().getTime()), "utc": new Date().toUTCString()});
});

// The API endpoint proper usage
app.get("/api/:date", function(request, response){
  var date_string = request.params.date;

  // Milliseconds or a word(invalid)
  if (date_string.split('-').length === 1 )
  { 
    // Validate the date(s)
    const reg = /\s/;
    var found = reg.test(date_string);
    // console.log(found);
    if ( found ) {
      // Handle the date in Long format
      if ( new Date(date_string) == 'Invalid Date' )
      {
         response.json({"error": "Invalid Date"});
      } else {
        response.json({"unix": parseInt(new Date(date_string).getTime()), "utc": new Date(date_string).toUTCString()});
      }
    } else if (!found) {
      if (/[A-Za-z]/.test(date_string)) {
        response.json({"error": "Invalid Date"});
      }
      else {
        // Valid milliseconds date
        var newdate = new Date(parseInt(date_string)).toUTCString();
        response.json({"unix": parseInt(date_string), "utc": newdate});
      }
    }
  }
  // Valid format of the date YYYY-MM-DD  
  else if ( date_string.split('-').length == 3 )
    {
      var new_date = new Date(date_string).toUTCString(); // valid for utc
      // console.log(new_date === "Invalid Date");
      // console.log(new Date(date_string).getTime());
      if ( new_date === "Invalid Date" ) {
        response.json({"error": "Invalid Date"});
      } else{

        var new_date_milliseconds = new Date(date_string).getTime();     // valid for unix
        // console.log(new_date_milliseconds);
        response.json({"unix": parseInt(new_date_milliseconds), "utc": new_date});
      }
    } else if ( date_string.split("-").length !=  2 )
      {
        response.json({"error": "Invalid Date"});
    }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
