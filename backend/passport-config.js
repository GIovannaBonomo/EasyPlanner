import User from "./models/User.js";
import GoogleStrategy from "passport-google-oauth20";
import { signJwt } from "./helpers/jwt.js";

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_HOST}${process.env.GOOGLE_CALLBACK_PATH}`,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          googleId: profile.id,
        });
      }

      const token = await signJwt({ id: user._id });
      cb(null, { token });
    } catch (err) {
      cb(err, null);
    }
  }
);

export default strategy;
