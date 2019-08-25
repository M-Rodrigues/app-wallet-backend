import db from "../db";

import User, { IUser } from "../models/User";
import Auth, { IAuth } from "../models/Auth";

import UserService from "./UserService";

import faker from "faker";

describe('Service: User', () => {
  const userUsername = faker.internet.userName();
  const userName = faker.name.findName();
  const userBirthday = faker.date.past();

  const authEmail: String = faker.internet.email();
  const authPassword: String = faker.internet.password();

  beforeAll(async () => db.connect());
  afterAll(async () => {
    
    try {
      await User.deleteMany({ username: userUsername });

      await Auth.deleteMany({ email: authEmail });
      
    } catch (error) {
      console.log(error);
    }
    
    db.disconnect();
  });


  it('Should create user with email and password', async () => {
    const userInput = {
      name: userName,
      username: userUsername,
      birthday: userBirthday,
      email: authEmail,
      password: authPassword
    };

    const spy = jest.spyOn(UserService, 'createUserWithEmailAndPassword');
    const user = await UserService.createUserWithEmailAndPassword(userInput)

    expect(spy).toBeCalled();

    expect(user).toHaveProperty("_id");
    expect(user).toHaveProperty("auth");
    expect(user).toMatchObject({
      name: expect.any(String),
      username: expect.any(String),
      birthday: expect.any(Date),
    });
  });

  it('Should throw error with bad input', async () => {
    let userInput = {};
    userInput[faker.lorem.word()] = faker.lorem.word();

    let result;
    try {
      result = await UserService.createUserWithEmailAndPassword(userInput);
    } catch (error) {
      result = error;
    }

    expect(result instanceof Error).toBe(true);
  });
});