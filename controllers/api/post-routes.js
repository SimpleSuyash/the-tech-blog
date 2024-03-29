const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
// Import the custom middleware
const withAuth = require("../../utils/auth");
const dayjs = require("dayjs");

// route to get one post/article with given post id for post detail page
router.get("/:id", withAuth, async (req, res) => {
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
            //using spread operator
            ...post,
            // post,
            pageTitle: "Post",
            loggedIn: req.session.loggedIn,
            loggedInUser: req.session.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };     
});


// route to create a new post 
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            creater_id: req.session.userId
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//route to update a post 
router.put("/:id", withAuth, async (req, res) => {
    const {title , content} =  req.body;
    const last_update_date = dayjs().format("YYYY-MM-DD");
    try{
        const dbUpdatedPost = await Post.update({
            title, 
            content, 
            last_update_date
        },
        {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(dbUpdatedPost);
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
});

//route to delete a post 
router.delete("/:id", withAuth, async(req, res)=>{
    try {
        const dbPostData = await Post.destroy({
            where: {
                id: req.params.id,
                creater_id: req.session.userId
            },
        });
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
          res.status(200).json(dbPostData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;