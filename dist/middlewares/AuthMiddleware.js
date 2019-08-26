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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!!token)
        throw { error: "NO_AUTHENTICATION", message: "Request needs authentication" };
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'jwt_secret');
        const exists = yield User_1.default.exists({ _id: user });
        if (!exists)
            throw { error: "INVALID_TOKEN", message: "Not possible to validate token" };
        req.body.payload = user;
    }
    catch (error) {
        return res.json(error);
    }
    return next();
});
exports.default = middleware;
//# sourceMappingURL=AuthMiddleware.js.map