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
const Auth_1 = __importDefault(require("./Auth"));
describe('Auth model', () => {
    const authEmail = faker_1.default.internet.email();
    const authPassword = faker_1.default.internet.password();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        db_1.default.connect();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Auth_1.default.deleteMany({ email: authEmail });
        }
        catch (error) {
            console.log(error);
        }
        db_1.default.disconnect();
    }));
    it('Should throw validation errors', () => {
        const auth = new Auth_1.default();
        expect(auth.validate).toThrow();
    });
    it('Should save a Auth', () => __awaiter(this, void 0, void 0, function* () {
        const auth = new Auth_1.default({
            email: authEmail,
            password: authPassword
        });
        const spy = jest.spyOn(auth, 'save');
        yield auth.save();
        expect(spy).toBeCalled();
        expect(auth).toMatchObject({
            email: expect.any(String),
            password: expect.any(String)
        });
        expect(auth.email).toBe(authEmail);
    }));
});
//# sourceMappingURL=Auth.spec.js.map