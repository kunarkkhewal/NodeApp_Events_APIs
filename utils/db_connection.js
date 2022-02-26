const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://bviqbgxaxqpyvp:633f88328388fc1e4c926768187ada0e2ec131a2b6fb125795b5111158a448c2@ec2-107-20-153-39.compute-1.amazonaws.com:5432/daati71ni2433a');
// console.log(' ------- process.env.DATABASE_URL => ', process.env.DATABASE_URL);
// const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;