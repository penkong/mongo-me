const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe,blogPost,comment;
  //create one comment user and post before each
  beforeEach((done)=>{
    joe = new User({ name : 'joe'});
    blogPost = new BlogPost({ title : 'mongo is great', content : 'of course it is'});
    comment = new Comment({ content : 'congrats for this blogpost creations'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;
    //promise all use frequently with associations collections
    Promise.all([joe.save(),blogPost.save(),comment.save()])
      .then(()=> done());
  });
  //if we want only run one test out of many use it.only
  // .then it actually is query executer like find one like exec()
  // mongoose do not let go inside associated from each other more than one cause crash
  // but how we do it
  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({name : 'joe'})
      //populate is query enhancer is modifier make sure we load up data
      //can take up more string to show more of nested in user
      .populate('blogPosts')
      .then((user)=>{
        assert(user.blogPosts[0].title === 'mongo is great');
        done();
      })
  });

  it('saves a full relation graph', (done) => {
    User.findOne({name : 'joe'})
      //path inside the user we fetch we want to recursively load this additional resource
      //populate means inside path we want go further inside and attempt to load up additional resources
      //models tell mongoose which model we using
      .populate({
        path : 'blogPosts',
        populate : {
          path : 'comments',
          model : 'comment',
          populate : {
            path : 'user',
            model : 'user'
          }
        }
      })
      .then((user)=>{
        assert(user.name === 'joe');
        assert(user.blogPosts[0].title === 'mongo is great');
        assert(user.blogPosts[0].comments[0].content === 'congrats for this blogpost creations');
        assert(user.blogPosts[0].comments[0].user.name === 'joe');
        done();
      });
  });

});


