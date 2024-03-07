const {Comment} = require("../models");

const commentData = [
    {
        content: "Definetly overblown! Way overblown! Just chill, people!",
        comment_date: "2024-02-05",
        post_id: 1,
        commenter_id: 1
    },
    {
        content: "Deepfake is a pandora's box. It should be immediately BANNED.",
        comment_date: "2024-02-06",
        post_id: 1,
        commenter_id: 3
    },
    {
        content: "Looking foward to Vision Pro.",
        comment_date: "2024-02-15",
        post_id: 3,
        commenter_id: 1
    },
    {
        content: "Just another expensive fad from apple :(",
        comment_date: "2024-02-19",
        post_id: 3,
        commenter_id: 3
    },
    {
        content: "When will it be available in the market, any idea?",
        comment_date: "2024-02-17",
        post_id: 2,
        commenter_id: 3
    },
    {
        content: "Hope this one doesn't have overheating issue.",
        comment_date: "2024-02-20",
        post_id: 2,
        commenter_id: 2
    },
    {
        content: "Waiting for RTX 4070 Super performance benchmark. ",
        comment_date: "2024-02-22",
        post_id: 2,
        commenter_id: 1
    }
];
const seedComments = ()=>Comment.bulkCreate(commentData);
module.exports = seedComments;