import db from "../db";

import User, { IUser } from "../models/User";
import Auth, { IAuth } from "../models/Auth";

import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

import faker from "faker";
import jwt from "jsonwebtoken";

describe('Service: Auth', () => {
  const userUsername = faker.internet.userName();
  const userName = faker.name.findName();
  const userBirthday = faker.date.past();

  const authEmail: String = faker.internet.email();
  const authPassword: String = faker.internet.password();

  beforeAll(async () => {
    db.connect();

    const user = await UserService.createUserWithEmailAndPassword({
      username: userUsername,
      name: userName,
      birthday: userBirthday,
      email: authEmail,
      password: authPassword 
    });
  });

  afterAll(async () => {
    try {
      await User.deleteMany({ username: userUsername });

      await Auth.deleteMany({ email: authEmail });
      
    } catch (error) {
      console.log(error);
    }
    
    db.disconnect();
  });

  it('Should authenticate a user and return JWT', async () => {
    const token = await AuthService.loginWithUsernameAndPassword({
      username: userUsername,
      password: authPassword
    });

    expect(token).toHaveProperty('token');

    const payload = jwt.decode(token.token);
    expect(payload).toHaveProperty('user');
  });

  it('Should throw error: wrong password', async () => {
    let result;
    try {
      result = await AuthService.loginWithUsernameAndPassword({
        username: faker.internet.userName(),
        password: authPassword
      });
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({
      error: expect.any(String),
      message: expect.any(String)
    });
  });

  it('Should throw error: username does not exists', async () => {
    let result;
    try {
      result = await AuthService.loginWithUsernameAndPassword({
        username: userUsername,
        password: faker.internet.password()
      });
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({
      error: expect.any(String),
      message: expect.any(String)
    });
  });

});