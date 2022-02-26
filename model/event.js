const Sequelize = require('sequelize');
const sequelize = require('../utils/db_connection');
const db = {};

const Event = sequelize.define('events', {
    // attributes
    eventname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    eventstartingtime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    eventduration: {
        type: Sequelize.TIME,
        allowNull: false
    }
}, {
    // options
});

db.Event = Event;

// Event.sync({ force: true }); //For Forceful Remove and Create Table

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;