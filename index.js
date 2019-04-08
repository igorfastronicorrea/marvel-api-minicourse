const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Ok');
});

require('./api/controller/heroes')(app);

var porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log('server started on port $(porta)');
});