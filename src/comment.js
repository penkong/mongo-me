const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CommentSchema = new Schema({
  content : String,
  user : {
    type : Schema.Types.ObjectId,
    ref : 'user'
  }
})
//author reviewer
// this type is point off to a record that sit in 
// different collection not nesting we refer.

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;