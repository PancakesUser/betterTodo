"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportManager = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
exports.passportManager = passport_1.default;
const morgan_1 = __importDefault(require("morgan"));
const router_1 = require("./router/router");
require("dotenv/config");
require("./database/connection");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)({ path: "./src/.env" });
const app = (0, express_1.default)();
var port = 3001 || process.env.PORT;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use(passport_1.default.initialize());
app.use((0, express_session_1.default)({
    resave: true,
    saveUninitialized: false,
    secret: "qwerty",
    cookie: {
        secure: false,
        maxAge: 864e+7
    }
}));
app.use(passport_1.default.session());
// 
app.use("/api", router_1.mainRouter);
app.listen(port);
