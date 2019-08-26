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
const express_1 = require("express");
const UserService_1 = __importDefault(require("../services/UserService"));
const router = express_1.Router();
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const users = yield UserService_1.default.getAllUsers();
    return res.json(users);
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield UserService_1.default.createUserWithEmailAndPassword(body);
        return res.json(user);
    }
    catch (error) {
        return res.json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=UserCtrl.js.map