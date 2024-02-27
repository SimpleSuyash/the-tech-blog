const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const {titleize} = require("../utils/textFormatter.js");
const dayjs = require("dayjs");

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
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        post_date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: dayjs().format("YYYY-MM-DD"),
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        last_update_date:{
            type: DataTypes.DATEONLY,
            defaultValue: null
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
                return newPostData;
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