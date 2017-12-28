const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const assignments = require('./activity') // activity è il file.js in cui il server gestirà tutte le richieste


app.use('/assignments', assignments)

app.set('port', (process.env.PORT || 5000));

// avvio il server
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});