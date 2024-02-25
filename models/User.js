const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
const { capitalize } = require("../utils/textFormatter.js");
const bcrypt = require("bcrypt");
const saltRounds = 12;

class User extends Model { 

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
                notNull: {
                    msg: "Username is required!"
                },
                notEmpty: {
                    msg: "Please provide Username!"
                },
                isAlphanumeric :{
                    msg: "Only alpha numeric value is allowed."
                }
            }
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "Email is required!"
                },
                notEmpty: {
                    msg: "Please provide Email!"
                },
                isEmail: {
                    msg: "Please provide valid Email id!"
                }
            }
        },
        password:{
            type: DataTypes.STRING(32),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password is required!"
                },
                notEmpty: {
                    msg: "Please provide Password!"
                },
                is: {
                    args: ["^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$", 'i'],
                    msg: "Password must be between 8 to 32 characters long containing at least one each of digit, lowercase character, uppercase character and special character!"
                }
            }
        }
    },
    {
        // When adding hooks via the init() method, they go below
        hooks: {
            // Use the beforeCreate hook to work with data before a new instance is created
            beforeCreate: async (newUserData) => {
jhnjjj;
                //username first letter capitalizing
                newUserData.username = await capitalize(newUserData.username);
                // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
                newUserData.email = await newUserData.email.toLowerCase();
                //storing password in hashed format
                newUserData.password = await bcrypt.hash(newUserData.password, saltRounds);

                return newUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;