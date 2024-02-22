const Post = require("./Post");
const Comment = require("./Comment");
const User = require("./User");

Post.belongsTo(User,{
    foreignKey: "creater_id"
});
User.hasMany(Post,{
    foreignKey: "creater_id"
});

Comment.belongsTo(User,{
    foreignKey: "commenter_id"
});
User.hasMany(Comment,{
    foreignKey: "commenter_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});
Post.hasMany(Comment,{
    foreignKey: "post_id",
    onDelete: "CASCADE",
});

module.exports = { Post, Comment, User};