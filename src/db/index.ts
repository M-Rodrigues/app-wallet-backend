import mongoose from "mongoose";


const connString = process.env.MONGO_CONN_STRING || "mongodb://root:example@localhost:27017/app-wallet&auth=admin"; 
const connector = {
  mongoose,
  connect() {    
    mongoose.connect(connString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      authSource: 'admin',
    // mongoose.connect('mongodb+srv://app-wallet-db:server_app_wallet@app-wallet-db-xnrz8.mongodb.net/test', {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
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