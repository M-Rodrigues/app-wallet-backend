import { model, Schema, Document } from "mongoose";
import { IAuth } from "./Auth";

export interface IUser extends Document {
  name: String;
  username: String;
  birthday: Date;
  auth: IAuth['_id'];
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
  }
});

export default model<IUser>('User', UserSchema);