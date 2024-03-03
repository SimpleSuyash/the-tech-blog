const router = require("express").Router();
const { Post, Comment, User, Dashboard } = require("../models");

// route to get one post/article by given post id
//populates the post data and displays in the form
//for user to edit it
router.get("/dashboard/:id",  async (req, res) => {
    const id = req.params.id;
    try{ 

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