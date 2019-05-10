// mongoose add some cool features to mongo api that mongo haven't
//inside one of them is validation help us not save incorrect input

const assert = require('assert');
const User = require('../src/user');

describe('validating records', () => {
  //no async it , means not done();
  it('require a user name', () => {
    //we dont save user intentionally to see procedure
    const user = new User({
      name: undefined
    });
    //this obj have all need of model to check from there.
    // just we look at prop use validatesytnc otherwise for 
    //fancy thing like check last name we use validate(()=>)
    //produce error obj
    const validationResult = user.validateSync();
    // console.log(validationResult);
    const {
      message
    } = validationResult.errors.name;
    assert(message === 'Name id required.');

  });

  it('requires a user name longer than 2 characters', () => {
    const user = new User({
      name: 'al'
    });
    const validationResult = user.validateSync();
    const {
      message
    } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({
      name: 'al'
    });
    user.save()
      .catch((validationResult) => {
        const {
          message
        } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters');
        //because it is async we need to sure use done callback
        done();
      });
  });
});