//to make assertion need new lib - not include in mocha.
const assert = require('assert');
//need to access to user.js to see it work correctly
const User = require('../src/user');

describe('Reading users out of database', () => {
  let joe,maria,zico,zac;
  //db is empty use bE to first make then check it
  beforeEach((done) => {
    //to make sure we can make reference to joe from bot don't use var key
    joe = new User({name: 'joe'});
    maria = new User({name: 'maria'});
    alex = new User({name: 'alex'});
    zac = new User({name: 'zac'});
    //when joe still not saved have prop in mongoose flag named isNew
    Promise.all([joe.save(),alex.save(),maria.save(),zac.save()])
      .then(() => done());
  });
  // assert is it guy. belong to it mean.
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
  xit('can skip and limit the result set', (done) => {
    //skip first user and limit to 2;
    User.find({})
      .sort({ name : 1 })
      .skip(1)
      .limit(2)
      .then((users)=>{
        //maybe lag of internet cause sequence become different
        assert(users.length === 2);
        assert(users[0] === 'joe');
        assert(users[1] === 'maria');

        done();
      })
  });
});