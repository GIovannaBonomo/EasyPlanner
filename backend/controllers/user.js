import { signJwt } from "../helpers/jwt.js";
import User from "../models/user.js";

export async function register(req, res, next) {
  console.log("Body ricevuto:", req.body);

  try {
    const { name, email, password} = req.body;
    console.log(req.file);

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email già registrata" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    const token = await signJwt({ id: newUser._id });

    return res.status(201).json({
      message: "Registrazione completata",
      token,
      author: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
    });
  } catch (err) {
    console.log(err, "errore nella registrazione");
    next(err);
  }
}



export async function login(req, res, next) {
  const { email, password } = req.body;
  const userEmail = await User.findOne({ email })

  if (userEmail) {
    if (await user.comparePassword(password)) {
      const jwt = await signJwt(
        {
          id: userEmail._id,
        })
      return res.status(200).json({ message: "token generato", jwt })
    }
  }
  return res.status(400).json({ message: "email o password errata" })
}