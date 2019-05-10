const mongoose = require('mongoose');
// for promise instead of bluebird and q
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false); //for use find one and update.
/////////////////WE ARE DOING CRUD
//executed only one time == to make sure 100% we are connected.
//signal to mocha wait until i connect 
before(() => {

  // we tell to mongoose to connect to mdb through mocha we check it
  mongoose.connect('mongodb://127.0.0.1:27017/users_test', {
    useNewUrlParser: true
  });
  mongoose.connection //ip:port  / name of db
    .once('open', () => {})
    .on('error', error => {
      console.warn('Warning', error);
    });
});
//************************************* */
//run hook - is func run before anything executed to clean up db for check 
//test work other wise test always pass
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    done(); //signal to mocha to run next test.
  });
});