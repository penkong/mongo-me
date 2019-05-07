//user model - all of data in single collection
//collection of users create in db 
const mongoose = require('mongoose');
//property of mongoose
const Schema = mongoose.Schema;
//schema is small part of model
const UserSchema = new Schema({
  name: String
});
// now creating user model with user collection name - User entire collection
const User = mongoose.model('user', UserSchema);

module.exports = User;