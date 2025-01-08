const Sequelize = require('sequelize');
const db = require('../util/database');

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    descricao: Sequelize.STRING,
    valor: Sequelize.DECIMAL,
    status: Sequelize.BOOLEAN
});

module.exports = Product;