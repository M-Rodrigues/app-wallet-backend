import db from "../db";

import User, { IUser } from "../models/User";
import Auth, { IAuth } from "../models/Auth";
import Account, { IAccount } from "../models/Account";
import Company from "../models/Company";

import UserService from "./UserService";
import AccountService from "./AccountService";

import faker from "faker";

describe('Service: Account', () => {
  let user: IUser;
  const userUsername = faker.internet.userName();
  const userName = faker.name.findName();
  const userBirthday = faker.date.past();

  const authEmail: String = faker.internet.email();
  const authPassword: String = faker.internet.password();

  beforeAll(async () => {
    db.connect();

    this.user = await UserService.createUserWithEmailAndPassword({
      name: userName, username: userUsername, birthday: userBirthday,
      email: authEmail, password: authPassword
    });
  });
  afterAll(async () => {
    try {
      const account: IAccount = await Account.findOne({ user: this.user._id });

      await Account.deleteMany({ user: this.user._id });
      await Company.deleteMany({ _id: account.company });
      await User.deleteMany({ username: userUsername });
      await Auth.deleteMany({ email: authEmail });
    } catch (error) {
      console.log(error);
    }
    
    db.disconnect();
  });

  it('Should create a debit account', async () => {
    const accontInput = {
      name: "Conta Corrente",
      company: "Banco do Brasil",
    };

    const account = await AccountService.createAccount(this.user, accontInput);

    expect(account).toHaveProperty('_id');
    expect(account.isCreditAccount).toBe(false);

    this.user = await User.findOne({username: userUsername});

    expect(this.user.accounts.length).toBe(1);
    expect(this.user.accounts.indexOf(account._id) != -1).toBe(true);
  });
});