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
            thumbnail: hero.thumbnail.path + "/portrait_xlarge.jpg",
        })
    });
};

router.get('/all', async (req, res) =>{
    
    let spider = formatHeroes(await marvel.characters.findByName('Spider-man'));
    let iron = formatHeroes(await marvel.characters.findByName('iron man'));
    let hulk = formatHeroes(await marvel.characters.findByName('hulk'));
    let capitaoAmerica = formatHeroes(await marvel.characters.findByName('Captain America'));
    let viuvaNegra = formatHeroes(await marvel.characters.findByName('Black Widow'));
    let thor = formatHeroes(await marvel.characters.findByName('thor'));

    
    const heroesAll = Object.assign({}, {heroes: {spider, iron, hulk, capitaoAmerica, viuvaNegra, thor}}) 
    return res.json(heroesAll);
});

router.get('/meta', async (req, res) =>{
    const metas = await marvel.metas.findAll();
    return res.metas
});

router.get('/img/:path', async (req, res) => {
    
});

module.exports = app => app.use('/heroes', router);