import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: String;
  username: String;
  birthday: Date;
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
});

export default model<IUser>('User', UserSchema);