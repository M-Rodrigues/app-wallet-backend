"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    birthday: {
        type: Date,
        required: true
    },
    auth: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
    }
});
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map