const router = require('express').Router();
const eventOperation = require('./../controller/event');

// GET ALL EVENTS INFORMATION
router.get('/', (req, res) => {
    eventOperation.findAll()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
});

// CREATE A NEW EVENT
router.post('/add', (req, res) => {
    eventOperation.createEvent(req.body)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
});

//UPDATE EVENT
router.put('/update', (req, res) => {
    eventOperation.updateEvent(req.body)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(400).send(err)
    })
});

module.exports = router;