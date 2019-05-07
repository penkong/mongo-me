// test for user creation in user.js
//describe block func - it blocks func - syntax inside.
//all it run by mocha one at time - assertion hope to do this.

//to make assertion need new lib - not include in mocha.
const assert = require('assert');
describe('Creating records', () => {
  it('save a user', () => {
    //assertion = hope
    assert(1 + 1 === 3);
  });
});
//define test command in package.json