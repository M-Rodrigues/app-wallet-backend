import { model, Schema, Document } from "mongoose";

export interface IAuth extends Document {
  email: string;
  password: string;
}

const AuthSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<IAuth>('Auth', AuthSchema);