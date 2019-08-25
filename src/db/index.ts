import mongoose from "mongoose";

// mongoose.Promise = global.Promise
const connector = {
  mongoose,
  connect() {    
    mongoose.connect('mongodb://localhost:27017/app-wallet', {
      useNewUrlParser: true,
      useCreateIndex: true,
      auth: {
        user: "root",
        password: "example"
      },
      authSource: 'admin'
    }).then(() => {
      // console.log('successfully connected to the database');
    }, err => {
      console.log('error connecting to the database');
      process.exit();
    });
  },
  disconnect() {
    return mongoose.disconnect()
  }
}

export default connector;