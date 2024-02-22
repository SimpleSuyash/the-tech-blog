const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const {titleize, capitalize} = require("../helper/textFormatter.js")

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(35),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Post title is required!"
                },
                notEmpty: {
                    msg: "Please provide Post title!"
                }
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Post content is required!"
                },
                notEmpty: {
                    msg: "Please provide Post content!"
                }
            }
        },
        created_at:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Date.now(),
            validate: {
                notNull: {
                    msg: "Post created date is required!"
                },
                notEmpty: {
                    msg: "Please provide Post creation date!"
                }
            }
        },
        last_updated_at:{
            type: DataTypes.DATEONLY,
        },
        creater_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        hooks: {
            // Use the beforeCreate hook to work with data before a new instance is created
            beforeCreate: async (newPostData) => {
                //titleize capitalized the first letter of every word
                newPostData.title = await titleize(newPostData.title);
                return newUserData;
            },
            // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated email address, before updating the database.
            beforeUpdate: async (updatedPostData) => {
                updatedPostData.title = await titleize(updatedPostData.title);
                return updatedPostData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;