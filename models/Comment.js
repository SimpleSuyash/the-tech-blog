const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
const dayjs = require("dayjs");

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Comment content is required!"
                },
                notEmpty: {
                    msg: "Please provide Comment content!"
                }
            }
        },
        comment_date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue:  dayjs().format("YYYY/MM/DD"),
            validate: {
                notNull: {
                    msg: "Comment created date is required!"
                },
                notEmpty: {
                    msg: "Please provide Comment creation date!"
                }
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "post",
                key: "id"
            }
        },
        commenter_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;