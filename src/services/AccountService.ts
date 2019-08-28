import Company from "../models/Company";
import User, { IUser } from "../models/User";
import Account from "../models/Account";

function validateAccountInput(data) {
  expect(data).toMatchObject({
    name: expect.any(String),
    company: expect.any(String),
  });
}

const service = {
  async createAccount(userInput: IUser, AccountInput) {
    validateAccountInput(AccountInput);

    const companyInput = { name: AccountInput.company };
    const companyExists = await Company.findOne(companyInput);
    const company = !!companyExists ? companyExists : new Company(companyInput);
    
    const accountInput = { 
      name: AccountInput.name,
      company: company._id,
      user: userInput._id
    };
    const accountExists = await Account.findOne(accountInput);
    if (!!accountExists) return accountExists;
    
    const account = new Account(accountInput);
    
    const user = await User.findById(userInput._id);
    user.accounts.push(account._id);
    
    await company.save();
    await account.save();
    await user.save();

    return account;
  }
}

export default service;