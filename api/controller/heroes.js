const express = require('express');
const api = require('marvel-api');

const router = express.Router();

const marvel = api.createClient({
    publicKey: '6428a27c51e91d6faf4ed9c826ad9b42',
    privateKey: 'a9eb3865a3da34bae53f9887d538325400636b74',
})

const formatHeroes = (marvelResults) => {
    return marvelResults.data.map((hero) => {
        return Object.assign({}, {
            name: hero.name,
            thumbnail: hero.thumbnail.path,
        })
    });
};

router.get('/all', async (req, res) =>{
    const heroes = formatHeroes(await marvel.characters.findAll());
    return res.json(heroes);
});

module.exports = app => app.use('/heroes', router);