const express = require("express");
const router = express.Router();
const Campground = require("../models/campground")
const middlewareObj = require("../middleware/index")


//show
router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            req.flash("error", err.message);
        }else{
            res.render("campgrounds/index", {campgrounds : allCampgrounds});
        }
    }); 
});

router.get("/new", middlewareObj.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            req.flash("error", "This campground not exists.");
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground : foundCampground});
        }
    })
})

router.post("/", middlewareObj.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let price = req.body.price;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {name: name, image: image, price: price, description: desc, author: author};
    Campground.create(newCampground, (err, newCreated) => {
        if(err){
            req.flash("error", "Fail add new campground.");
        }else{
            req.flash("success", "You've added a new campground successfully.")
            res.redirect("campgrounds");
        }
    });
    
});

router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, editCampground) => {
        res.render("campgrounds/edit", {campground : editCampground});
    });
});

router.put("/:id", middlewareObj.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updateCampground) => {
        if(err){
            req.flash("error", "Fail to update a campground.");
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Update successfully.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

router.delete("/:id", middlewareObj.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            req.flash("error", "Fail to delete a campground.");
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Delete successfully.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;