var express = require('express');
var model = require('./models/team.model');

var router = express.Router();

router.get('/list', async function (req, res) {
    try {
        var players = await model.find();
        res.json(players)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/add', async (req, res) => {
    const player = new model({
        name: req.body.name,
        position: req.body.position,
        jersey_number: req.body.jersey,
        age: req.body.age,
        assists: req.body.assists,
        points_per_game: req.body.points,
    })

    try {
        const data = await player.save();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const player = await model.findByIdAndDelete(req.params.id)
        res.json({ "message": `Player "${player.name}" deleted` })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const player = await model.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        )
        res.send(player)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 1. Get List of Players By Position
router.get('/getByPosition/:position', async (req, res) => {
    try {
        const player = await model.find({ "position": req.params.position });
        res.json(player)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 2. Get Player having least points
router.get('/leastPoints', async (req, res) => {
    try {
        const player = await model.find().sort({ points_per_game: 1 }).limit(1);
        res.json(player)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 3. Top 3 players with most points
router.get('/topThree', async (req, res) => {
    try {
        const players = await model.find().sort({ points_per_game: -1 }).limit(3);
        res.json(players)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 4. Get Player having most assists
router.get('/mostAssists', async (req, res) => {
    try {
        const player = await model.find().sort({ assists: -1 }).limit(1);
        res.json(player)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 5. Players sorted by age descending
router.get('/sortByAge', async (req, res) => {
    try {
        const players = await model.find().sort({ age: -1 });
        res.json(players)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;