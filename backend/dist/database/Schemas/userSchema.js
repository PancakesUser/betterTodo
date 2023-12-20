"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    global_name: { type: String, required: true },
    avatar: { type: String, required: true, default: null }
});
exports.default = (0, mongoose_1.model)("User", User);
