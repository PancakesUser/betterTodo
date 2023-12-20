import express from "express"
import { authRoutes } from "./auth/auth"
import { userRouter } from "./users/users";
import { noteRouter } from "./notes/notes";
const router = express.Router()

router.use("/auth", authRoutes);
router.use("/users", userRouter);
router.use("/notes", noteRouter);

export {router as v1_routes}