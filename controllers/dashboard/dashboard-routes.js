const router = require("express").Router();
const { Post, Comment, User, Dashboard } = require("../../models");
// Import the custom middleware
const withAuth = require("../../utils/auth");

// route to get one post/article by given post id
//populates the post data and displays in the form
//for user to edit it
router.get("/:id",  async (req, res) => {
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

// Use withAuth middleware to prevent access to route
router.get("/", withAuth, async (req, res) => {
    try {
        if(!req.session.loggedIn){
            res.redirect("/login");
            return;
        }
      // Find the logged in user based on the session ID
        const dbUserData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ["password"] },
            include: [{ model: Post }],
        });
  
      const user = dbUserData.get({ plain: true });
  
        res.render("dashboard", {
            ...user,
            // user,
            loggedIn: true,
            pageTitle: "Dashboard",
            loggedInUser: req.session.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;