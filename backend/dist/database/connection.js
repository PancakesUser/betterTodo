"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
(() => {
    try {
        mongoose_1.default.connect(`mongodb+srv://hyzun:ZvFyYFSVVB2d4rgj@cluster0.gdlc1pk.mongodb.net/`)
            .catch((err) => { console.log(err); });
        console.log("Database Connected. ✅");
    }
    catch (err) {
        if (err)
            throw new Error(`Database Connection Error: ${err}`);
    }
})();
