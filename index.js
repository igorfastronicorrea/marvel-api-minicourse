const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Ok');
});

require('./api/controller/heroes')(app);

app.listen(3000, () => {
    console.log('server started on port 3000');
});