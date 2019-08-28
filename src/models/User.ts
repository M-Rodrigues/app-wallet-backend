import { model, Schema, Document } from "mongoose";
import { IAuth } from "./Auth";
import { IAccount } from "./Account";

export interface IUser extends Document {
  name: String;
  username: String;
  birthday: Date;
  auth: IAuth['_id'];
  accounts: [IAccount['_id']];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: Date,
    required: true
  },
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  },
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }]
});

export default model<IUser>('User', UserSchema);