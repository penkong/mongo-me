const assert = require('assert');
const User = require('../src/user');


describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'PostTitle'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({ name: 'joe', posts: [] });

    joe.save()
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        user.posts.push({ title: 'new post' });
        return user.save(); //because of having new promise in future must return sth for that
      })
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert( user.posts[0].title === 'new post' );
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name : 'joe',
      posts : [{title : 'new Title'}]
    })
    joe.save()
      .then(()=> User.findOne({ name:'joe' }))
      .then((user)=>{
        //mongoose give us alternate api to slice or pain splice
        const post = user.posts[0];
        post.remove(); //not save auto like joe
        return user.save();
      })
      .then(()=> User.findOne({name : 'joe'}))
      .then((user)=>{
        assert(!user.posts.length);
        done();
      })
  });
})