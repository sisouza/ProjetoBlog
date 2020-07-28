const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category")

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})



// Rel, 1-1 R, 1 article has 1 category
Article.belongsTo(Category)
//1-N R, 1 category has n articles
Category.hasMany(Article)

/*updanting the models on db
Article.sync({force: true})*/

module.exports = Article