const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
// Import the custom middleware
const withAuth = require("../../utils/auth");

// route to get one post/article
router.get("/:id", withAuth, async (req, res) => {
    // router.get("/:id",  async (req, res) => {
    const id = req.params.id;
    try{ 
        if(!req.session.loggedIn){
            res.redirect("/login");
            return;
        }
        const dbPostData = await Post.findByPk(id,{
            include:[{
                model: User,
                attributes:["username"]
            }]
        });
        if(!dbPostData) {
            res.status(404).json({message: `No posts found for given id ${id}!`});
            return;
        }
        const dbCommentData = await Comment.findAll({
            where:{
                post_id: id
            },
            include:[{
                model: User,
                attributes:["username"]
            }]
        });
        
        const post= dbPostData.get({ plain: true });
        const comments = dbCommentData.map(comment => comment.get({plain: true}));
        post.comments = comments;
        res.render("post-detail", {
            //not using spread operator
            //some partials cannot be reused
            // because the data is not in same slevel
            // ...post,
            post,
            pageTitle: "Post",
            loggedIn: req.session.loggedIn,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };     
});

module.exports = router;