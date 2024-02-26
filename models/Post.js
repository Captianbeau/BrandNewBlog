//  {
//     "id": "",
//     "title": "",
//     "content":"",
//     "user_id": ""
// }

const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        content:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName:true,
        createdAt:true,
        modelName:'post',
    }
);

module.exports = Post;