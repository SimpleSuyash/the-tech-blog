const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
const { capitalize } = require("../utils/textFormatter.js");
const bcrypt = require("bcrypt");
const saltRounds = 3;

class User extends Model { 
    checkPassword(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(35),
            allowNull: false,
            unique: true,
            validate: {
                notNull: true,
                notEmpty: true,
                isAlphanumeric :true
            }
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notNull: true,
                notEmpty: true,
                isEmail: true
            }
        },
        password:{
            // type: DataTypes.STRING(32),
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/i
                // len:[8,32]
            }
        }
    },
    {
        // adding hooks 
        hooks: {
            // Use the beforeCreate hook to work with data before a new instance is created
            beforeCreate: async (newUserData) => {
                //username first letter capitalizing
                newUserData.username = await capitalize(newUserData.username);
                // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
                newUserData.email = await newUserData.email.toLowerCase();
                //storing password in hashed format
                newUserData.password = await bcrypt.hash(newUserData.password, saltRounds);

                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;