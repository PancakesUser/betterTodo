"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1_routes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth/auth");
const router = express_1.default.Router();
exports.v1_routes = router;
router.use("/auth", auth_1.authRoutes);
