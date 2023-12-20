"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = require("../../../utils/PassportStrategy/passport");
const router = express_1.default.Router();
exports.authRoutes = router;
router.use("/discord", passport_1.passportDiscordMethod.authenticate("discord"));
