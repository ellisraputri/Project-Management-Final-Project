import express from "express";
import { loginWithGoogle, logout } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/firebase", loginWithGoogle);
authRouter.post("/logout", logout);

export default authRouter;
