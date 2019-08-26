"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CompanySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});
exports.default = mongoose_1.model('Company', CompanySchema);
//# sourceMappingURL=Company.js.map