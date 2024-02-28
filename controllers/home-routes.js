const router = require("express").Router();
const {Post, User, Comment} = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

//route to get all posts
router.get("/", async (req, res)=>{
    try {
        const postData  = await Post.findAll();
       
        const posts = postData.map(post => post.get({plain: true}));
        res.render("homepage",{
            posts,
            pageTitle: "Home",
            loggedIn: req.session.loggedIn,
            user: req.session.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}); 

/*

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ["password"] },
            include: [{ model: Post }],
        });
  
      const user = userData.get({ plain: true });
  
        res.render("dashboard", {
            ...user,
            loggedIn: true,
            title: "Dashboard"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
*/
router.get("/login", (req, res)=>{
    // If the user is already logged in, redirect to the dashboard
    if (req.session.loggedIn) {
        res.redirect("/dashboard");
        return;
    }
    // Otherwise, render the 'login' template
    res.render("login",{
        title: "Login",
    });
});

module.exports = router;