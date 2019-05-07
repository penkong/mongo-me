const mongoose = require('mongoose');

// we tell to mongoose to connect to mdb through mocha we check it
mongoose.connect('mongodb://127.0.0.1:27017/users_test', {
  useNewUrlParser: true
});
mongoose.connection //ip:port  / name of db
  .once('open', () => console.log('good to go'))
  .on('error', error => {
    console.warn('Warning', error);
  });