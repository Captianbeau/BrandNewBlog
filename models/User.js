// {
//     "id": "",
//     "username": "",
//     "email": "",
//     "password": ""
// }

const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPass){
        return bcrypt.compareSync(loginPass, this.password);
    }
}

User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        email: {
            type:DataTypes.STRING,
            unique:true,
            validate:{
                isEmail:true,
            },
        },
        password: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[8],
            },
        },
    },
    {
        hooks:{
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
            },
        },
        sequelize,
        timestamps:false,
        freezeTableName:true,
        modelName:'user',
    }
);

module.exports = User;