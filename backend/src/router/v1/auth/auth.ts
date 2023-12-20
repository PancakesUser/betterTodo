import express from "express"
import { passportDiscordMethod } from "../../../utils/PassportStrategy/passport";
const router = express.Router()

router.use("/discord", passportDiscordMethod.authenticate("discord"));
router.use("/discord/callback", (req: any, res: express.Response) => {
    res.redirect(`http://localhost:3000/${req.user.id}/notes`);
});

export {router as authRoutes}