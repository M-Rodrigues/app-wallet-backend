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
const UserService_1 = __importDefault(require("../services/UserService"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const faker_1 = __importDefault(require("faker"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('Service: Auth', () => {
    const userUsername = faker_1.default.internet.userName();
    const userName = faker_1.default.name.findName();
    const userBirthday = faker_1.default.date.past();
    const authEmail = faker_1.default.internet.email();
    const authPassword = faker_1.default.internet.password();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        db_1.default.connect();
        const user = yield UserService_1.default.createUserWithEmailAndPassword({
            username: userUsername,
            name: userName,
            birthday: userBirthday,
            email: authEmail,
            password: authPassword
        });
    }));
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
    it('Should authenticate a user and return JWT', () => __awaiter(this, void 0, void 0, function* () {
        const token = yield AuthService_1.default.loginWithUsernameAndPassword({
            username: userUsername,
            password: authPassword
        });
        expect(token).toHaveProperty('token');
        const payload = jsonwebtoken_1.default.decode(token.token);
        expect(payload).toHaveProperty('user');
    }));
    it('Should throw error: wrong password', () => __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            result = yield AuthService_1.default.loginWithUsernameAndPassword({
                username: faker_1.default.internet.userName(),
                password: authPassword
            });
        }
        catch (error) {
            result = error;
        }
        expect(result).toMatchObject({
            error: expect.any(String),
            message: expect.any(String)
        });
    }));
    it('Should throw error: username does not exists', () => __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            result = yield AuthService_1.default.loginWithUsernameAndPassword({
                username: userUsername,
                password: faker_1.default.internet.password()
            });
        }
        catch (error) {
            result = error;
        }
        expect(result).toMatchObject({
            error: expect.any(String),
            message: expect.any(String)
        });
    }));
});
//# sourceMappingURL=AuthService.spec.js.map