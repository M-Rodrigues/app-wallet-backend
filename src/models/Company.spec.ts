import db from "../db";
import faker from "faker";
import User, { IUser } from "./User";
import Auth, { IAuth } from "./Auth";

describe('Company model', () => {
  // const userUsername = faker.internet.userName();
  // const userName = faker.name.findName();
  // const userBirthday = faker.date.past();

  // const authEmail: String = faker.internet.email();
  // const authPassword: String = faker.internet.password();


  // beforeAll(async () => db.connect());
  // afterAll(async () => {
    
  //   try {
  //     await User.deleteMany({ username: userUsername });

  //     await Auth.deleteMany({ email: authEmail });
      
  //   } catch (error) {
  //     console.log(error);
  //   }
    
  //   db.disconnect();
  // });

  it('First test', () => {
    // const user = new User();
    // expect(user.validate).toThrow();
  });
});
