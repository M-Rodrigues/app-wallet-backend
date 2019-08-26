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
const User_1 = __importDefault(require("../models/User"));
const expect_1 = __importDefault(require("expect"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateUserInput = (userInput) => {
    expect_1.default(userInput).toMatchObject({
        name: expect_1.default.any(String),
        username: expect_1.default.any(String),
        birthday: expect_1.default.any(Date),
        email: expect_1.default.any(String),
        password: expect_1.default.any(String),
    });
};
const validateLoginInput = (loginInput) => {
    expect_1.default(loginInput).toMatchObject({
        username: expect_1.default.any(String),
        password: expect_1.default.any(String),
    });
};
const errorMessage = {
    error: "LOGIN_ERROR",
    message: "Could not validate your credentials"
};
const service = {
    loginWithUsernameAndPassword(loginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            validateLoginInput(loginInput);
            const user = yield User_1.default.findOne({
                username: loginInput.username
            }, 'auth').populate('auth');
            if (!user)
                throw errorMessage;
            const match = yield bcrypt_1.default.compare(loginInput.password, user.auth.password);
            if (!match)
                throw errorMessage;
            const token = jsonwebtoken_1.default.sign({ user: user._id }, process.env.JWT_SECRET || 'jwt_secret', { expiresIn: '1h' });
            return { token };
        });
    }
};
exports.default = service;
//# sourceMappingURL=AuthService.js.map