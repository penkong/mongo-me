//to make assertion need new lib - not include in mocha.
const assert = require('assert');
//need to access to user.js to see it work correctly
const User = require('../src/user');

describe('Deleting a user', () => {
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
  //joe object == model instance
  it('model instance remove', (done) => {
    joe.deleteOne()
      .then(() => User.findOne({
        name: 'joe'
      }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  //User class == model class
  it('class method remove', (done) => {
    // remove a bunch of records
    User.deleteMany({
        name: 'joe'
      })
      .then(() => User.findOne({
        name: 'joe'
      }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it('class method findOneAndRemove', (done) => {
    // find ret arr vs findOne ret record
    User.findOneAndDelete({
        name: 'joe'
      })
      .then(() => User.findOne({
        name: 'joe'
      }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it('class method findByIdAndRemove', (done) => {
    // find ret arr vs findOne ret record
    User.findByIdAndDelete(joe._id)
      .then(() => User.findOne({
        name: 'joe'
      }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});