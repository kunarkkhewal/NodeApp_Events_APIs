const Sequelize = require('sequelize');
const url = process.env.DATABASE_URL || 'postgres://bviqbgxaxqpyvp:633f88328388fc1e4c926768187ada0e2ec131a2b6fb125795b5111158a448c2@ec2-107-20-153-39.compute-1.amazonaws.com:5432/daati71ni2433a';
const sequelize = new Sequelize(url, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;