const mongoose = require('mongoose')

var blogSchema=new mongoose.Schema(
    {
        title: {type:String, required:true},
        image_url: {type:String, required:true},
        content: {type:String, required:true},
        date: { type: Date, required:false ,default: Date.now }
    }
);

var Blog = mongoose.model('Post', blogSchema);

module.exports=Blog;