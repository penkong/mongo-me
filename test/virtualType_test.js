const assert = require('assert');
const User = require('../src/user');

//these way of writing a program is test driven
describe('virtual types', () => {
  it('postCount return number of posts', (done) => {
    const joe = new User({
      name : 'joe',
      posts : [{title : 'new Title'}]
    });
    joe.save()
      .then(()=> User.findOne({title : 'joe'}))
      .then((user)=>{
        assert(joe.postCount === 1);
        done();
      })
  });
})
