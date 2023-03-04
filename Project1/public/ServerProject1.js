var express = require('express');
var fs = require('fs');
var app = express();

// Require the module required for using form data
var bodyParser = require('body-parser');

// For parsing application
app.use(bodyParser.urlencoded({ extended: true}))

// Homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/guestbook', function (req, res) {
    var data = require('./jsonguestbookdata.json');
    //res.json(data);

    var results = '<table border="1"> ';

    for (var i = 0 ; i < data.length ; i++ ){
        results +=
        '<tr>' +
        '<td>' + data[i].username + '</td>' +
        '<td>' + data[i].country + '</td>' +
        '<td>' + data[i].date + '</td>' +
        '<td>' + data[i].message + '</td>' +
        '</tr>';
    }

    res.send(results);

});

//Route for form sending the POST data
app.post('/adduser', function (req, res) {

    var data = require('./exampledata2.json');

    data.push({
    "Name": req.body.name,
    "Company": req.body.company,
    "Email": req.body.email,
    "Date": new Date()

    })

    // Convert the JSON object to a string format
    var jsonStr = JSON.stringify(data);

    // Wrote data to a file
    fs.writeFile('exampledata2.json', jsonStr, (err) => {
        if (err) throw err;
        console.log ('it\'s saved!');
    });
    
    res.send("Saved the data to a file. Browse to the /details to see the content of the file")
});

//The 404 Route (Always kepe this as the last route)
app.get('*', function (req, res){
    res.status(404).send('Cant find the requested page');
});

app.listen(8080, function (){
    console.log('Example app listing on port 8080!')
});