"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserCtrl_1 = __importDefault(require("./controllers/UserCtrl"));
const router = express_1.Router();
router.get('/', (req, res) => res.json("Welcome to app-wallet API"));
router.use('/users', UserCtrl_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map