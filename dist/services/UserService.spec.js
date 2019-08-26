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
const User_1 = __importDefault(require("../models/User"));
const Auth_1 = __importDefault(require("../models/Auth"));
const UserService_1 = __importDefault(require("./UserService"));
const faker_1 = __importDefault(require("faker"));
describe('Service: User', () => {
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
    it('Should create user with email and password', () => __awaiter(this, void 0, void 0, function* () {
        const userInput = {
            name: userName,
            username: userUsername,
            birthday: userBirthday,
            email: authEmail,
            password: authPassword
        };
        const spy = jest.spyOn(UserService_1.default, 'createUserWithEmailAndPassword');
        const user = yield UserService_1.default.createUserWithEmailAndPassword(userInput);
        expect(spy).toBeCalled();
        expect(user).toHaveProperty("_id");
        expect(user).toHaveProperty("auth");
        expect(user).toMatchObject({
            name: expect.any(String),
            username: expect.any(String),
            birthday: expect.any(Date),
        });
    }));
    it('Should throw error with bad input', () => __awaiter(this, void 0, void 0, function* () {
        let userInput = {};
        userInput[faker_1.default.lorem.word()] = faker_1.default.lorem.word();
        let result;
        try {
            result = yield UserService_1.default.createUserWithEmailAndPassword(userInput);
        }
        catch (error) {
            result = error;
        }
        expect(result instanceof Error).toBe(true);
    }));
});
//# sourceMappingURL=UserService.spec.js.map