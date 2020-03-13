const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middlewareObj = require("../middleware/index")

//comment new
router.get("/new", middlewareObj.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            req.flash("error", err.message);
        }else{
            res.render("comments/new", {campground : campground});
        }
    })
});

//comment create
router.post("/", middlewareObj.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            req.flash("error", "Can not find this campground.");
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    req.flash("error", "Fail to add a new comment.");
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Comment successfully.");
                    res.redirect("/campgrounds/" + campground._id);
                }
                
            });
        }
    })
});


router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
    
});

router.put("/:comment_id", middlewareObj.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, newComment) => {
        if(err){
            req.flash("error", "Fail to edit this comment.");
            res.redirect("back");
        }else{
            req.flash("success", "Edit comment successfully.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

router.delete("/:comment_id", middlewareObj.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err){
            req.flash("error", "Fail to delete this comment.");
            res.redirect("back");
        }else{
            req.flash("success", "Delete comment successfully.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;