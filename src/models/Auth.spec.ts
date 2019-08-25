import db from "../db";
import Auth, { IAuth } from "./Auth";

describe('Auth model', () => {
  beforeAll(async () => db.connect());
  afterAll(async () => {
    
    try {
      const result = await Auth.deleteMany({
        email: /test@test.com/
      });
      
      console.log(result);
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
      email: "test@test.com",
      password: 'pwd'
    });

    const spy = jest.spyOn(auth, 'save');
    await auth.save();

    expect(spy).toBeCalled();

    expect(auth).toMatchObject({
      email: expect.any(String),
      password: expect.any(String)
    });

    expect(auth.email).toBe('test@test.com');
  });
});
