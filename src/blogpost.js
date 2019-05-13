const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BlogPostSchema = new Schema({
  title : String,
  content : String,
  comments : [{
    type : Schema.Types.ObjectId,
    ref : 'comment'
  }]
})

// this type is point off to a record that sit in 
// different collection not nesting we refer.

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;