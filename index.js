/**
 * Created by fabio on 02/12/2017.
 */

//const db = require('./db')

const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());



const assignments = require('./assignments')


app.use('/assignments', assignments)


var port = process.env.PORT || 8080;
app.listen(port);

//app.set('port', (process.env.PORT || 5000));

//app.listen(app.get('port'), function() {
//    console.log('Node app is running on port', app.get('port'));
//});

