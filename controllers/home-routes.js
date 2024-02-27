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
            title: "Home",
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}); 
// route to get one dish
router.get("/post/:id", withAuth, async (req, res) => {
    const id = req.params.id;
    try{ 
        const postData = await Post.findByPk(id,{
            include:[Comment, User]
        });
        if(!postData) {
            res.status(404).json({message: `No posts found for given id ${id}!`});
            return;
        }
        res.status(200).json(postData);
        // const post= postData.get({ plain: true });
        // res.render('post', post);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };     
});

router.get("/login", (req, res)=>{
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // Otherwise, render the 'login' template
    res.render("login",{
        title: "Login",
    });
});

module.exports = router;