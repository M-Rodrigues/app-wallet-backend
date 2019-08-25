import db from "../db";
import faker from "faker";
import Auth, { IAuth } from "./Auth";

describe('Auth model', () => {
  const authEmail: String = faker.internet.email();
  const authPassword: String = faker.internet.password();

  beforeAll(async () => {
    db.connect();
  });
  
  afterAll(async () => {  
    try {
      const result = await Auth.deleteMany({ email: authEmail });
      
    } catch (error) {
      console.log(error);
    }
    
    db.disconnect();
  });

  it('Should throw validation errors', () => {
    const auth = new Auth();
    expect(auth.validate).toThrow();
  });

  it('Should save a Auth', async () => {
    const auth: IAuth = new Auth({
      email: authEmail,
      password: authPassword
    });

    const spy = jest.spyOn(auth, 'save');
    await auth.save();

    expect(spy).toBeCalled();

    expect(auth).toMatchObject({
      email: expect.any(String),
      password: expect.any(String)
    });

    expect(auth.email).toBe(authEmail);
  });
});
