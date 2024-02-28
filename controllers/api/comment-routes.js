const router = require("express").Router();
const { Comment } = require("../../models");
// Import the custom middleware
const withAuth = require("../../utils/auth");

router.post("/", async(req, res)=>{
    try {
        if(!req.session.loggedIn){
            res.redirect("/login");
            return;
        }
        const newComment = await Comment.create({
            ...req.body,
            commenter_id: req.session.userId,
        });
    
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;