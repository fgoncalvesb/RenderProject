var express = require('express');
var fs = require('fs');
var app = express();

// Require the module required for using form data
var bodyParser = require('body-parser');

// For parsing application
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static(__dirname + '/Project1/public'))

// Homepage HTML
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Project1/public/index.html');
})

// Newmessage HTML
app.get('/newmessage', function (req, res) {
    res.sendFile(__dirname + '/Project1/public/newmessage.html');
})

// Ajaxmessage HTML
app.get('/ajaxmessage', function (req, res) {
    res.sendFile(__dirname + '/Project1/public/ajaxmessage.html');
})

// Guestbook HTML, I create it dynamically
app.get('/guestbook', function (req, res) {
    var data = require('./Project1/public/jsonguestbookdata.json');

    // Adding bootstrap
    var results = '<head>' +  '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">' +
                              '<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.slim.min.js"></script>' +
                              '<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>' +
                              '<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>' + 
                  '</head>';

    results += '<table class="table"><thead>';

    results +=
        '<tr>' +
        '<th scope="col">' + 'Username' + '</th>' +
        '<th scope="col">' + 'Country' + '</th>' +
        '<th scope="col">' + 'Date' + '</th>' +
        '<th scope="col">' + 'Message' + '</th>' +
        '</tr></thead>';

    results += '<tbody>';

    for (var i = 0 ; i < data.length ; i++ ){
        results +=
        '<tr>' +
        '<td>' + data[i].username + '</td>' +
        '<td>' + data[i].country + '</td>' +
        '<td>' + data[i].date + '</td>' +
        '<td>' + data[i].message + '</td>' +
        '</tr>';
    }

    results += '</tbody></table>';

    res.send(results);

});

//Route for form sending the POST data
app.post('/newmessage', function (req, res) {

    //console.log(req);

    var data = require('./Project1/public/jsonguestbookdata.json');

    data.push({
    "username": req.body.username,
    "country": req.body.country,
    "date": new Date(),
    "message": req.body.message,

    })

    // Convert the JSON object to a string format
    var jsonStr = JSON.stringify(data);

    // Wrote data to a file
    fs.writeFile('./Project1/public/jsonguestbookdata.json', jsonStr, (err) => {
        if (err) throw err;
        console.log ('it\'s saved!');
    });
    
    res.send("Saved the data to a file. Browse to /guestbook to see the content of the file")
    //res.send(JSON.stringify(req));
});


//Route for form sending the POST data
app.post('/newmessageajax', function (req, res) {

    //console.log(req);

    var data = require('./Project1/public/jsonguestbookdata.json');

    data.push({
    "username": req.body.username,
    "country": req.body.country,
    "date": new Date(),
    "message": req.body.message,

    })

    // Convert the JSON object to a string format
    var jsonStr = JSON.stringify(data);

    // Wrote data to a file
    fs.writeFile('./Project1/public/jsonguestbookdata.json', jsonStr, (err) => {
        if (err) throw err;
        console.log ('it\'s saved!');
    });

    var results = '<table class="table"><thead>';

    results +=
        '<tr>' +
        '<th scope="col">' + 'Username' + '</th>' +
        '<th scope="col">' + 'Country' + '</th>' +
        '<th scope="col">' + 'Date' + '</th>' +
        '<th scope="col">' + 'Message' + '</th>' +
        '</tr></thead>';

    results += '<tbody>';

    for (var i = 0 ; i < data.length ; i++ ){
        results +=
        '<tr>' +
        '<td>' + data[i].username + '</td>' +
        '<td>' + data[i].country + '</td>' +
        '<td>' + data[i].date + '</td>' +
        '<td>' + data[i].message + '</td>' +
        '</tr>';
    }

    results += '</tbody></table>';

    res.send(results);
    
   // res.send("Saved the data to a file. Browse to the /guestbook to see the content of the file")
    //res.send(JSON.stringify(req));
});

//The 404 Route (Always kepe this as the last route)
app.get('*', function (req, res){
    res.status(404).send('Cant find the requested page');
});

app.listen(8080, function (){
    console.log('Example app listing on port 8080!')
});