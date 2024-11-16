//sequelize.config.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données MySQL établie avec Sequelize'))
    .catch(err => console.error('Impossible de se connecter à la base de données MySQL:', err));

module.exports = sequelize;


