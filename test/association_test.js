const mongoose = require('mongoose');

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
  });
});


