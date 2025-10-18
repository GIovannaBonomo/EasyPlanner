import express from "express";
import passport from "passport";
import { register, login } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_HOST}/login/success?jwt=${req.user.token}`);
  }
);

export default userRouter;
