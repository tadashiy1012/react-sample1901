const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const axios = require('axios');
const xmljs = require('xml-js');

const app = express();

app.set('ejs', ejs.renderFile);

app.use(morgan('tiny'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', {});
});

app.get('/tenki', (req, res) => {
    axios.get('https://rss-weather.yahoo.co.jp/rss/days/6010.xml')
        .then((resp) => {
            const json = xmljs.xml2json(resp.data, {compact: true});
            res.send(json);
        });
});

app.listen(3000, () => console.log('server start on 3000'));