//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// // Load the core build.
// var _ = require('lodash/core');
// // Load the FP build for immutable auto-curried iteratee-first data-last methods.
// var fp = require('lodash/fp');
//
// // Load method categories.
// var array = require('lodash/array');
// var object = require('lodash/fp/object');
//
// // Cherry-pick methods for smaller browserify/rollup/webpack bundles.
// var at = require('lodash/at');
// var curryN = require('lodash/fp/curryN');

// var arr = new Array(2);
// var arr = [];
var len = 100;
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});

const postSchema = {
  title: String,
  post: String
}

const Post = mongoose.model("Post", postSchema);










app.get("/", function(req, res){

  Post.find({},function(err, found){ // here found is a collection which came out from Post.find

    res.render("home",{
      details: homeStartingContent,
      post: found
    });
  })


})







app.get("/about", function(req, res){
  res.render("about",{
    aboutdetails: aboutContent
  });
})







app.get("/contact", function(req, res){
  res.render("contact",{
    contactdetails: contactContent
  });
})






app.get("/youtube", function(req, res){
  res.render("youtube");
})






app.get("/composemyarticle", function(req, res){
  res.render("compose");
})







app.post("/composemyarticle", function(req, res){
    var fullArticle = req.body.text;

    const postNew = new Post(
      {
        title: req.body.title,
        post: req.body.text
      }
    );

    postNew.save(function(err){
      if(!err){
        res.redirect("/");
      }
    });
  // if(fullArticle.length > len){
  //   fullArticle = fullArticle.substr(0,100);
  // }
  //  const post = {
  //    title: req.body.title,
  //    text: fullArticle,
  //    maintext: mainArticle
  //  };
  //
  //  arr.push(post);


})








app.get("/blog/:postName", function(req,res){
  var requestedTitle = _.lowerCase(req.params.postName);

Post.find({},function(err, result){
  if(!err){  /////////////////////////
    result.forEach(function(post){
      var mainTitle = post.title;
      var storedTitle = _.lowerCase(post.title);
      if(storedTitle === requestedTitle){
          res.render("post",{
            Heading: mainTitle,
            Article: post.post
          })
      }
    });
  } ///////////////
  })
})







// all those which are commented out will be written again

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// <%  for(var i=0; i<post.length ;i++){ %>
//     <h1><%post[i].title%></h1>
//     <p><%post[i].text%></p>
// <% } %>







// <a href="/blog/<%=each.title%>">..Read More</a>
