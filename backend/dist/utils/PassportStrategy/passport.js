"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportDiscordMethod = void 0;
const __1 = require("../..");
Object.defineProperty(exports, "passportDiscordMethod", { enumerable: true, get: function () { return __1.passportManager; } });
const passport_discord_1 = __importDefault(require("passport-discord"));
const userSchema_1 = __importDefault(require("../../database/Schemas/userSchema"));
function updateUser(id, global_name, avatar) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedUser = yield userSchema_1.default.findOneAndUpdate({ id }, {
                $set: {
                    global_name,
                    avatar
                }
            }, { new: true }).exec();
            return updatedUser;
        }
        catch (err) {
            if (err)
                throw new Error(`We couldn't update the user. Error: ${err}`);
        }
    });
}
__1.passportManager.serializeUser((user, done) => {
    if (user._id) {
        return done(null, user._id);
    }
    return done("_id wasn't found!", false);
});
__1.passportManager.deserializeUser((_id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield userSchema_1.default.findById({ _id }).exec();
    if (User) {
        return done(null, User);
    }
    else {
        return done("User doesn't exist!", false);
    }
}));
__1.passportManager.use("discord", new passport_discord_1.default.Strategy({
    clientID: `${process.env.clientID}`,
    clientSecret: `${process.env.clientSecret}`,
    callbackURL: `${process.env.clientCallback}`,
    scope: ["identify"]
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, global_name, avatar } = profile;
        try {
            const User = yield userSchema_1.default.findOne({ id }).exec();
            if (User) {
                if (global_name && avatar) {
                    return done(null, updateUser(id, global_name, avatar));
                }
            }
            else {
                const new_user = new userSchema_1.default({
                    id,
                    global_name,
                    avatar
                });
                yield new_user.save();
                return done(null, new_user);
            }
        }
        catch (err) {
            if (err) {
                done(err, false);
                throw new Error(`We had a problem with the Passport_Authentication. Error: ${err}`);
            }
        }
    });
}));
console.log(process.env.clientSecret);
