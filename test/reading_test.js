//to make assertion need new lib - not include in mocha.
const assert = require('assert');
//need to access to user.js to see it work correctly
const User = require('../src/user');

describe('Reading users out of database', () => {
  let joe;
  //db is empty use bE to first make then check it
  beforeEach((done) => {
    //to make sure we can make reference to joe from bot don't use var key
    joe = new User({
      name: 'joe'
    });
    joe.save() //when joe still not saved have prop in mongoose flag named isNew
      .then(() => done());
  });
  // assert is it guy.
  it('find all users with a name of joe', (done) => {
    // find ret arr vs findOne ret record
    User.find({
        name: 'joe'
      })
      .then((users) => {
        // console.log(users);  == catch id here to compare top joe to check correct test
        // id s are not row id they are object id. kind of wrapper.
        //because of async seems always need use of done
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
  });
  it('find a user with particular id', (done) => {
    // find ret arr vs findOne ret record
    User.findOne({
        _id: joe._id
      })
      .then((user) => {
        assert(user.name === 'joe');
        done();
      });
  });
});