const Sequelize = require('sequelize')

               //from const above
const connection = new Sequelize('projetoblog','youruserhere','yourpasswordhere',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection