//to make assertion need new lib - not include in mocha.
const assert = require('assert');
//need to access to user.js to see it work correctly
const User = require('../src/user');

describe('Updating records', () => {
  let joe;
  //db is empty use bE to first make then check it
  beforeEach((done) => { //to save or touch mongo use done to derived sth
    //to make sure we can make reference to joe from bot don't use var key
    joe = new User({
      name: 'joe',
      postCount: 0
    });
    joe.save() //when joe still not saved have prop in mongoose flag named isNew
      .then(() => done());
  });

  // helper function for not DRY for assert like delete because for all it its same
  function assertName(operation, done) {
    operation
      .then(() => User.find({})) // empty obj bring us whole data of db
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'alex');
        done();
      });
  }
  //joe object == model instance
  //idea of set and save to find different and only after find 
  //we have permission to save.
  it('instance type using set and save', (done) => {
    joe.set('name', 'alex')
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.updateOne({
      name: 'alex'
    }), done);

  });

  //User class == model class
  it('A model class can update', (done) => {
    assertName(User.updateMany({
      name: 'joe'
    }, {
      name: 'alex'
    }), done);
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({
      name: 'joe'
    }, {
      name: 'alex'
    }), done);
  });
  it('A model class can find a record with an Id an update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, {
      name: 'alex'
    }), done);
  });
  //class base update. old way cause all set to 1 but we want to add up 1
  //  we use mongo operators to these $inc for example 
  it('a user can have their post count incremented by 1', (done) => {
    User.updateMany({
        name: 'joe'
      }, {
        $inc: {
          postCount: 1
        }
      })
      .then(() => User.findOne({
        name: 'joe'
      }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});