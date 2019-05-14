const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe,blogPost;
  //take before each from associations
  beforeEach((done)=>{
    joe = new User({ name : 'joe'});
    blogPost = new BlogPost({ title : 'mongo is great', content : 'of course it is'});

    joe.blogPosts.push(blogPost);
    //promise all use frequently with associations collections
    Promise.all([joe.save(),blogPost.save()])
      .then(()=> done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    //count db to check remove is completely done
    joe.remove()
      .then(()=> BlogPost.count())
      .then((count)=>{
        assert(count === 0);
        done();
      })
  });
})
