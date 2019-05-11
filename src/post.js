//this is inside user model , this is new schema 
// remember a schema is props of model.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String
});
// createdAt for examole

module.exports = PostSchema;