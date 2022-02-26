const Sequelize = require('sequelize');
const sequelize = require('../utils/db_connection');

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
        type: Sequelize.STRING, //to see this
        allowNull: false
    }
}, {
    // options
});

module.exports = Event;