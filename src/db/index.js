const mongoose = require('mongoose');


// mongoose.Promise = global.Promise
module.exports = {
  mongoose,
  connect() {    
    mongoose.connect('mongodb://localhost:27017/app-wallet', {
      useNewUrlParser: true,
      auth: {
        user: "root",
        password: "example"
      },
      authSource: 'admin'
    }).then(() => {
      console.log('successfully connected to the database');
    }, err => {
      console.log('error connecting to the database');
      process.exit();
    });
  },
  disconnect() {
    return mongoose.disconnect()
  }
}