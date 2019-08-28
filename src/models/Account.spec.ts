import db from "../db";
import faker from "faker";

import User, { IUser } from "./User";
import Auth, { IAuth } from "./Auth";
import Company, { ICompany } from "./Company";
import Account, { IAccount, ICreditDetails } from "./Account";

import UserService from "../services/UserService";

describe('Account model', () => {
  const userUsername = faker.internet.userName();
  const userName = faker.name.findName();
  const userBirthday = faker.date.past();

  const authEmail: String = faker.internet.email();
  const authPassword: String = faker.internet.password();


  beforeAll(async () => {
    db.connect();

    await UserService.createUserWithEmailAndPassword({
      username: userUsername,
      name: userName,
      birthday: userBirthday,
      email: authEmail,
      password: authPassword
    });
  });

  afterAll(async () => {
    
    try {
      const user: IUser = await User.findOne({ username: userUsername });
      const account: IAccount = await Account.findOne({ user: user._id });

      await Account.deleteMany({ user: user._id });
      await Company.deleteMany({ _id: account.company });
      await User.deleteMany({ username: userUsername });
      await Auth.deleteMany({ email: authEmail });
      
    } catch (error) {
      console.log(error);
    }
    
    db.disconnect();
  });

  it('Should throw validation errors', () => {
    const account = new Account();
    expect(account.validate).toThrow();
  });

  it('Should save a Debit Account', async () => {
    const user: IUser = await User.findOne({ username: userUsername });

    const company: ICompany = new Company({
      name: faker.company.companyName()      
    });

    const account: IAccount = new Account({
      name: faker.finance.accountName(),
      company: company._id,
      user: user._id
    });

    const spyAcc = jest.spyOn(account, 'save');
    await account.save();

    expect(spyAcc).toBeCalled();

    expect(account).toHaveProperty("_id");
    expect(account.credit).toBeUndefined();
    expect(account.isCreditAccount).toBe(false);
  });

  it('Should save a Credit Account', async () => {
    const user: IUser = await User.findOne({ username: userUsername });

    const company: ICompany = new Company({
      name: faker.company.companyName()      
    });

    const credit: ICreditDetails = {
      limit: faker.random.number(),
      closingDay: faker.random.number()%30 + 1,
      dueDay: faker.random.number()%30 + 1
    };
    const account: IAccount = new Account({
      name: faker.finance.accountName(),
      credit: credit,
      company: company._id,
      user: user._id
    });

    const spyAcc = jest.spyOn(account, 'save');
    await account.save();

    expect(spyAcc).toBeCalled();
    expect(account).toHaveProperty("_id");
    expect(account.credit).toMatchObject({
      limit: expect.any(Number),
      closingDay: expect.any(Number),
      dueDay: expect.any(Number),
    });
    expect(account.isCreditAccount).toBe(true);
  });

  it('Should throw error when missing ICreditDetails arguments', async () => {
    const user: IUser = await User.findOne({ username: userUsername });

    const company: ICompany = new Company({
      name: faker.company.companyName()      
    });

    const credit = {
      limit: faker.random.number(),
      dueDay: faker.random.number()%30 + 1,
    };
    const account: IAccount = new Account({
      name: faker.finance.accountName(),
      credit: credit,
      company: company._id,
      user: user._id
    });

    expect(account.save).toThrow();
  });
});
