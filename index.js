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


app.get("/api/",function(req,res){
  var myDateObject = new Date();

  var unixTime = (myDateObject.getTime());
    var utcDate = myDateObject.toUTCString();
  res.json({unix:unixTime,utc:utcDate});

});

app.get("/api/:datestring",function(req,res){
  var unixTime;
  var utcDate;
  var myDateObject;
  //try and create a date oject from the request parameter
  if(req.params.datestring==""){
    myDateObject=new Date();
  }else{
  var myDateObject = new Date(req.params.datestring);
  }

  //if the object was created successfully then set the unix time and the 
  if(myDateObject instanceof Date && !isNaN(myDateObject)){
    unixTime = (myDateObject.getTime());
    utcDate = myDateObject.toUTCString();
  }else{
  //else if there was no object succefully created the the date date was invalid so try and create a date objectfrom the number passed. 
    unixTime=parseInt(req.params.datestring);    
    utcDate = new Date(unixTime).toUTCString(); 
  }

  //Check once again if the a date object has been successfully created.
  if(!isNaN(unixTime)){
  //if so then return the unix and utc Date
  res.json({unix:unixTime,utc:utcDate});
  console.log(unixTime);
  } else {
    //else return an error message
    res.json({"error":"Invalid Date"});
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
