const router = require('express').Router();
const {Post, User, Comment} = require('../models');

//route to get all posts
router.get("/", async (req, res)=>{
    try {
        const postData  = await Post.findAll({
            include:[ 
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        });
        const posts = postData.map(post => post.get({plain: true}));
        res.render("homepage");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
    // route to get one dish
    router.get('/post/:id', async (req, res) => {
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
});
module.exports = router;