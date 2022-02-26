const router = require('express').Router();
const eventOperation = require('./../controller/event');

// GET ALL USERS INFORMATION
router.get('/', (req, res) => {
    console.log(' ------- WELCOME TO EVENTS');
})


module.exports = router;