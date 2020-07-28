const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

/*updating the model on database
Category.sync({force: true})*/

module.exports = Category