import { model, Schema, Document } from "mongoose";

export interface IAuth extends Document {
  email: String;
  password: String;
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
}, {
  timestamps: true
});

export default model<IAuth>('Auth', AuthSchema);