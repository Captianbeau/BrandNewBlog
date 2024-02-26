//TODO user_id and post_id
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/');

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'',
                key:'',
            }
        },
        post_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'',
                key:'',
            },
        },
    },
    {
        sequelize,
        freezeTableName:true,
        createdAt: true,
        modelName:'comment',
    }
);

module.exports = Comment;