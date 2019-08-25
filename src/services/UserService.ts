import Auth, { IAuth } from "../models/Auth";
import User, { IUser } from "../models/User";

import expect from "expect";
import bcrypt from "bcrypt";

const validateInput = (userInput) => {
  expect(userInput).toMatchObject({
    name: expect.any(String),
    username: expect.any(String),
    birthday: expect.any(Date),
    email: expect.any(String),
    password: expect.any(String),
  });
}

const service = {
  async createUserWithEmailAndPassword(userInput) {
    validateInput(userInput);

    const hashPassword = await bcrypt.hash(
      userInput.password, 
      process.env.BCRYPT_SALT_ROUNDS || 3
    );

    const auth: IAuth = new Auth({
      email: userInput.email,
      password: hashPassword
    });
    await auth.save();

    const user: IUser = new User({
      name: userInput.name,
      username: userInput.username,
      birthday: userInput.birthday,
      auth: auth._id
    });
    await user.save();

    return user;
  }
}

export default service;