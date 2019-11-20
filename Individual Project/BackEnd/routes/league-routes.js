const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/all', async (_req, res) => {
    const result = await models.League.findAll({
        include: [
            {
                model: models.Team
            }
        ]
    });
    res.send(result);
});

router.get('/:index', async (req, res) => {
    const [first = null] = await models.League.findAll({
        where: { id: req.params.index },
        include: [
            { model: models.Team }
        ]
    });
    if (first) {
        res.send(first);


    } else {
        res.status(404).send({ message: 'League not found for index ' + req.params.index });
    }
});

router.get('/byname/:name', async (req, res) => {
    const [first = null] = await models.League.findAll({
        where: { name: req.params.name },
        include: [
            { model: models.Team }
        ]
    });
    if (first) {
        res.send(first);

    } else {
        res.status(404).send({ message: 'League not found for name ' + req.params.index });
    }
});

router.post('', async (req, res) => {
    const newLeague = await models.League.create({ name: req.body.name });

    req.body.teams.forEach(async name => {
        await models.Team.create({ name, leagueId: newLeague.id });
    });

    const foundLeague = await models.League.findByPk(newLeague.id, {
        include: [
            { model: models.Team }
        ]
    });
    res.send(foundLeague);
});

router.delete('/:index', async (req, res) => {
    const leagueToDelete = await models.League.destroy({ where: { id: req.body.id } });

    await models.Team.destroy({ where: { leagueId: req.body.id } });
    res.send();
});


module.exports = router;