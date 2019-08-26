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
const Auth_1 = __importDefault(require("../models/Auth"));
const User_1 = __importDefault(require("../models/User"));
const expect_1 = __importDefault(require("expect"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validateInput = (userInput) => {
    expect_1.default(userInput).toMatchObject({
        name: expect_1.default.any(String),
        username: expect_1.default.any(String),
        birthday: expect_1.default.any(Date),
        email: expect_1.default.any(String),
        password: expect_1.default.any(String),
    });
};
const service = {
    createUserWithEmailAndPassword(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            validateInput(userInput);
            const hashPassword = yield bcrypt_1.default.hash(userInput.password, process.env.BCRYPT_SALT_ROUNDS || 3);
            const auth = new Auth_1.default({
                email: userInput.email,
                password: hashPassword
            });
            yield auth.save();
            const user = new User_1.default({
                name: userInput.name,
                username: userInput.username,
                birthday: userInput.birthday,
                auth: auth._id
            });
            yield user.save();
            return user;
        });
    },
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = User_1.default.find({})
                .populate('auth', 'email');
            return users;
        });
    }
};
exports.default = service;
//# sourceMappingURL=UserService.js.map