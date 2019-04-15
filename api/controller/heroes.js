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
            id: hero.id,
            name: hero.name,
            thumbnail: hero.thumbnail.path + "/portrait_xlarge.jpg",
        })
    });
};

const formatDetailHeroes = (marvelResults) =>{
    return marvelResults.data.map((hero) => {
        return Object.assign({}, {
            id: hero.id,
            name: hero.name,
            thumbnail: hero.thumbnail.path + "/portrait_xlarge.jpg",
            description: hero.description,
        })
    });
};

router.get('/all', async (req, res) =>{
    
    let spider_man = formatHeroes(await marvel.characters.findByName('Spider-man'))[0];
    let iron_man = formatHeroes(await marvel.characters.findByName('iron man'))[0];
    let hulk = formatHeroes(await marvel.characters.findByName('hulk'))[0];
    let captain_america = formatHeroes(await marvel.characters.findByName('Captain America'))[0];
    let black_widow = formatHeroes(await marvel.characters.findByName('Black Widow'))[0];
    let thor = formatHeroes(await marvel.characters.findByName('thor'))[0];

    const heroesAll = Object.assign({}, {heroes: [spider_man, iron_man, hulk, captain_america, black_widow, thor]}) 
    return res.json(heroesAll);
});

router.get('/detail/:id', async (req, res) =>{
    
    let heroDetail = Object.assign({}, {avenger: formatDetailHeroes(await marvel.characters.find(req.params.id))[0]    }) 
    return res.json(heroDetail);
});


router.get('/meta', async (req, res) =>{
    const metas = await marvel.metas.findAll();
    return res.metas
});

router.get('/img/:path', async (req, res) => {
    
});

module.exports = app => app.use('/heroes', router);