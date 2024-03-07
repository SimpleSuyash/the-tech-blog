const {Comment} = require("../models");

const commentData = [
    {
        id:1,
        content: "Definetly overblown! Way overblown! Just chill, people!",
        comment_date: "2024-02-05",
        post_id: 1,
        commenter_id: 2
    },
    {
        id:2,
        content: "Deepfake is a pandora's box. It should be immediately BANNED.",
        comment_date: "2024-02-06",
        post_id: 1,
        commenter_id: 3
    },
    {
        id:3,
        content: "Looking foward to Vision Pro.",
        comment_date: "2024-02-15",
        post_id: 2,
        commenter_id: 1
    },
    {
        id:4,
        content: "Just another expensive fad from apple :(",
        comment_date: "2024-02-19",
        post_id: 2,
        commenter_id: 2
    },
    {
        id:5,
        content: "When will the Vision Pro be available in the market, any idea?",
        comment_date: "2024-02-17",
        post_id: 2,
        commenter_id: 3
    },
    {
        id:6,
        content: "Hope this one doesn't have overheating issue.",
        comment_date: "2024-02-20",
        post_id: 3,
        commenter_id: 2
    },
    {
        id:7,
        content: "Waiting for RTX 4070 Super performance benchmark. ",
        comment_date: "2024-02-22",
        post_id: 3,
        commenter_id: 3
    }
];
const seedComments = ()=>Comment.bulkCreate(commentData);
module.exports = seedComments;