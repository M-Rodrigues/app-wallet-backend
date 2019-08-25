import db from "../db";
import User, { IUser } from "./User";

describe('User model', () => {
  beforeAll(async () => db.connect());
  afterAll(async () => {
    
    try {
      const result = await User.deleteMany({
        username: /test_username/
      });
      
      // console.log(result);
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
    const user: IUser = new User({
      name: "Matheus",
      username: "test_username",
      birthday: Date()
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

    expect(user.username).toBe('test_username');
  });
});
