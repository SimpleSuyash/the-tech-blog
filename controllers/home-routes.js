const router = require("express").Router();
const {Post, User, Comment} = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

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


// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
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

router.get("/login", (req, res)=>{
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // Otherwise, render the 'login' template
    res.render("login");
});

module.exports = router;