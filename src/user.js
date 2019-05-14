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
  posts: [PostSchema], //nested sub doc list of post in user
  likes : Number,
  blogPosts : [{
    type : Schema.Types.ObjectId,
    ref : 'blogPost'
  }]
});
// something related to sub schema but it's not related by nature
//like post count field in user ==>usage of virtual to connect
// any field in parent not consist in child -> do it by server
//server count and return virtual type or field actually not save in db
// field postCount : Number
// get func like this cause quickly run in real its joe.postCount();
// post count become func in reality node shell try
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

//-----------------MIDDLEWARE---------------------
// clean up by middleware
//4 kind init , save , remove , validate
//every middleware call with func next() let story continue
UserSchema.pre('remove', function(next){
  //pull out from mongoose model
  const BlogPost = mongoose.model('blogPost');
  //this === joe
  // use mongo operator like $inc for query $in go in blogposts look at ids
  BlogPost.remove({ _id : { $in : this.blogPosts}})
    .then(()=>next());
});

// now creating user model with user collection name - User entire collection
const User = mongoose.model('user', UserSchema);

module.exports = User;