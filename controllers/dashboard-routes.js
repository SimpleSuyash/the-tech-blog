const router = require("express").Router();
const { Post, Comment, User, Dashboard } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");
// route to get one post/article
router.get("/dashboard/:id", withAuth, async (req, res) => {
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
                attributes:["email"]
            }]
        });
        if(!dbPostData) {
            res.status(404).json({message: `No posts found for given id ${id}!`});
            return;
        }
        const post= dbPostData.get({ plain: true });
        res.render("post-update", {
            //using spread operator
            ...post,
            pageTitle: "Update Post",
            loggedIn: req.session.loggedIn,
            loggedInUser: req.session.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };     
});
module.exports = router;