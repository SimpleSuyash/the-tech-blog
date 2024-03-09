const router = require("express").Router();
const {Post, User, Comment} = require("../models");
// Import the custom middleware
// const withAuth = require("../utils/auth");

//route to get all posts
router.get("/", async (req, res)=>{
    try {
        const dbPostData  = await Post.findAll({
            include:[{
                model: User,
                attributes:["username"]
            }]
        });
       
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render("homepage",{
            posts,
            pageTitle: "Home",
            loggedIn: req.session.loggedIn,
            loggedInUser: req.session.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}); 


module.exports = router;