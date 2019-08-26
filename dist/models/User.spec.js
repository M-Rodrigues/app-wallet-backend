"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const faker_1 = __importDefault(require("faker"));
const User_1 = __importDefault(require("./User"));
const Auth_1 = __importDefault(require("./Auth"));
describe('User model', () => {
    const userUsername = faker_1.default.internet.userName();
    const userName = faker_1.default.name.findName();
    const userBirthday = faker_1.default.date.past();
    const authEmail = faker_1.default.internet.email();
    const authPassword = faker_1.default.internet.password();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () { return db_1.default.connect(); }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        try {
            yield User_1.default.deleteMany({ username: userUsername });
            yield Auth_1.default.deleteMany({ email: authEmail });
        }
        catch (error) {
            console.log(error);
        }
        db_1.default.disconnect();
    }));
    it('Should throw validation errors', () => {
        const user = new User_1.default();
        expect(user.validate).toThrow();
    });
    it('Should save a User', () => __awaiter(this, void 0, void 0, function* () {
        const auth = new Auth_1.default({
            email: authEmail,
            password: authPassword,
        });
        yield auth.save();
        const user = new User_1.default({
            name: userName,
            username: userUsername,
            birthday: userBirthday,
            auth: auth._id
        });
        const spy = jest.spyOn(user, 'save');
        yield user.save();
        expect(spy).toBeCalled();
        expect(user).toHaveProperty("_id");
        expect(user).toMatchObject({
            name: expect.any(String),
            username: expect.any(String),
            birthday: expect.any(Date)
        });
        expect(user.username).toBe(userUsername);
    }));
});
//# sourceMappingURL=User.spec.js.map