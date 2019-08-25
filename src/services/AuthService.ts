import Auth, { IAuth } from "../models/Auth";
import User, { IUser } from "../models/User";

import expect from "expect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const validateUserInput = (userInput) => {
  expect(userInput).toMatchObject({
    name: expect.any(String),
    username: expect.any(String),
    birthday: expect.any(Date),
    email: expect.any(String),
    password: expect.any(String),
  });
}

const validateLoginInput = (loginInput) => {
  expect(loginInput).toMatchObject({
    username: expect.any(String),
    password: expect.any(String),
  });

}

const errorMessage = {
  error: "LOGIN_ERROR",
  message: "Could not validate your credentials"
};

const service = {
  async loginWithUsernameAndPassword(loginInput) {
    validateLoginInput(loginInput);

    const user = await User.findOne({
      username: loginInput.username
    }, 'auth').populate('auth');

    if (!user) throw errorMessage;

    const match = await bcrypt.compare(
      loginInput.password,
      user.auth.password
    );

    if (!match) throw errorMessage;

    const token = jwt.sign(
      { user: user._id }, 
      process.env.JWT_SECRET || 'shhhhh',
      { expiresIn: '1h'}
    );

    return { token };
  }
}

export default service;