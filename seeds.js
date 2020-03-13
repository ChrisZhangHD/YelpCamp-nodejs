var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
        name: "Salmon Greek", 
        image: "https://www.photosforclass.com/download/pixabay-4756774?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e7d0454d55a814f6da8c7dda793f7f1636dfe2564c704c7d2c7fd6924ac559_960.jpg&user=worldvashemudomu",
        description: "This is a huge Salmon Greek."
        },{
        name: "Salmon Greek", 
        image: "https://www.photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd6924ac559_960.jpg&user=Ben_Frieden",
        description: "This is a huge Salmon Greek."
        },{
        name: "Salmon Greek", 
        image: "https://www.photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd6924ac559_960.jpg&user=Ben_Frieden",
        description: "This is a huge Salmon Greek."
        }
    ]

function seedDB(){
    //remove all campground
    Campground.deleteMany({}, function(err){
        // if (err) {
        //     console.log(err);
        // } 
        // console.log("campground removed!");
        // //add campground
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("added a campground!");
        //             //creat a new comment
        //             Comment.create({
        //                 text: "bla bla bla",
        //                 author: "zhd"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("added a new comment!");
        //                 }
        //             });
        //         }
        //     });
        // })
    });
}



module.exports = seedDB;