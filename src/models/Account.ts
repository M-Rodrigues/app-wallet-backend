import { model, Schema, Document } from "mongoose";

import { IUser } from "./User";
import { ICompany } from "./Company";

export interface ICreditDetails {
  limit: Number,
  closingDay: Number,
  dueDay: Number,
}

export interface IAccount extends Document {
  name: String,
  credit: ICreditDetails,
  company: ICompany["_id"],
  user: IUser["_id"],
  isCreditAccount: boolean,
}

const AccountSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  credit: {
    type: {
      limit: {
        type: Number,
        required: true,
      },
      closingDay: {
        type: Number,
        required: true,
      },
      dueDay: {
        type: Number,
        required: true
      }
    },
    required: false,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});


AccountSchema.index({ name: 1, company: 1, user: 1 });

AccountSchema.path('credit').validate(
  data => !data || (!!data.limit && !!data.closingDay && !!data.dueDay), 
  'Missing atributes for credit account'
);

AccountSchema.virtual('isCreditAccount').get(function() {
  return !!this.credit
});


export default model<IAccount>('Account', AccountSchema);