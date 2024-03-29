const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
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
                notNull: true,
                notEmpty: true
            }
        },
        comment_date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue:  dayjs().format("YYYY-MM-DD"),
            validate: {
                notNull: true,
                notEmpty: true
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