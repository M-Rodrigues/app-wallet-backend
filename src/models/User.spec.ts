import db from "../db";
import faker from "faker";
import User, { IUser } from "./User";
import Auth, { IAuth } from "./Auth";

describe('User model', () => {
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

  it('Should throw validation errors', () => {
    const user = new User();
    expect(user.validate).toThrow();
  });

  it('Should save a User', async () => {
    const auth: IAuth = new Auth({
      email: authEmail,
      password: authPassword,
    });

    await auth.save();
    
    const user: IUser = new User({
      name: userName,
      username: userUsername,
      birthday: userBirthday,
      auth: auth._id
    });
    
    const spy = jest.spyOn(user, 'save');
    await user.save();

    expect(spy).toBeCalled();

    expect(user).toHaveProperty("_id");
    expect(user).toMatchObject({
      name: expect.any(String),
      username: expect.any(String),
      birthday: expect.any(Date)
    });

    expect(user.username).toBe(userUsername);
  });
});
