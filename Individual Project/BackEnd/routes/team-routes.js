const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/all', async (_req, res) => {
    const result = await models.Team.findAll({
        include: [
            {
                model: models.League
            }
        ]
    });
    res.send(result);
});

router.get('/:index', async (req, res) => {
    const [first = null] = await models.Team.findAll({ where: { id: req.params.index } });
    if (first) {
        res.send(first);
    } else {
        res.status(404).send({ message: 'Team not found for index ' + req.params.index });
    }
});

router.get('/byname/:name', async (req, res) => {
    const [first = null] = await models.Team.findAll({
        where: { name: req.params.name },
        include: [
            { model: models.League }
        ]
    });
    if (first) {
        res.send(first);

    } else {
        res.status(404).send({ message: 'Team not found for name ' + req.params.name });
    }
});

router.post('', async (req, res) => {
    models.Team.create(req.body);
    res.send();
});

router.put('/byname/:name', async (req, res) => {
    try {
        await models.Team.update(req.body, {
            where: { name: req.params.name },
        });

        res.send()
    }
    catch (err) {
        res.status(404).send({ message: 'Team not found for name ' + req.params.name });
    }
});

router.delete('/:index', (req, res) => {
    res.send('Not implemented!');
});


module.exports = router;