//user model - all of data in single collection
//collection of users create in db 
const mongoose = require('mongoose');
const PostSchema = require('./post');
//property of mongoose
//schema is small part of model
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    //for at least 3 chars
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters'
    },
    //for input force
    required: [true, 'Name id required.']
  },
  postCount: Number,
  posts: [PostSchema] //nested sub doc list of post in user
});
// now creating user model with user collection name - User entire collection
const User = mongoose.model('user', UserSchema);

module.exports = User;