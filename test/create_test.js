// test for user creation in user.js
//describe block func - it blocks func - syntax inside.
//all it run by mocha one at time - assertion hope to do this.

//to make assertion need new lib - not include in mocha.
const assert = require('assert');
//need to access to user.js to see it work correctly
const User = require('../src/user');

describe('Creating records', () => {
  it('save a user', (done) => {
    //assertion = hope - creat user - save it - is saved?
    const joe = new User({
      name: 'joe'
    });
    joe.save() //when joe still not saved have prop in mongoose flag named isNew
      .then(() => {
        // has been joe saved??
        assert(!joe.isNew);
        done();
      })
  });
});
//define test command in package.json