const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

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
        created_at:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Date.now(),
            validate: {
                notNull: {
                    msg: "Comment created date is required!"
                },
                notEmpty: {
                    msg: "Please provide Comment creation date!"
                }
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