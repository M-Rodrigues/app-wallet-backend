"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// mongoose.Promise = global.Promise
const connector = {
    mongoose: mongoose_1.default,
    connect() {
        // mongoose.connect('mongodb://localhost:27017/app-wallet', {
        //   useNewUrlParser: true,
        //   useCreateIndex: true,
        //   auth: {
        //     user: "root",
        //     password: "example"
        //   },
        //   authSource: 'admin'
        mongoose_1.default.connect('mongodb+srv://app-wallet-db:server_app_wallet@app-wallet-db-xnrz8.mongodb.net/test', {
            useNewUrlParser: true,
            useCreateIndex: true,
        }).then(() => {
            console.log('successfully connected to the database');
        }, err => {
            console.log('error connecting to the database');
            process.exit();
        });
    },
    disconnect() {
        return mongoose_1.default.disconnect();
    }
};
exports.default = connector;
//# sourceMappingURL=index.js.map