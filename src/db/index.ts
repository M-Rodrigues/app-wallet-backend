import mongoose from "mongoose";


const connString = process.env.MONGO_CONN_STRING || "mongodb://root:example@localhost:27017/app-wallet"; 
const connector = {
  mongoose,
  connect() {    
    mongoose.connect(connString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      authSource: 'admin',
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