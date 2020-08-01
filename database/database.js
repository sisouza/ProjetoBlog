const Sequelize = require('sequelize')

               //from const above
const connection = new Sequelize('projetoblog','youruserhere','yourpasshere',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection