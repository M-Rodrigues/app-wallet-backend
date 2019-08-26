import { model, Schema, Document } from "mongoose";

export interface ICompany extends Document {
  name: String;
}

const CompanySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

export default model<ICompany>('Company', CompanySchema);