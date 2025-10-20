import { signJwt } from "../helpers/jwt.js";
import User from "../models/User.js";


export async function register(req, res, next) {

  try {
    const { email, password } = req.body;

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email non valida." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email già registrata" });
    }

    const passwordRegex = /^(?=[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password non valida. Deve avere almeno 8 caratteri, iniziare con maiuscola e contenere almeno un numero" });
    }

    const newUser = new User({
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
    if (await userEmail.comparePassword(password)) {
      const jwt = await signJwt(
        {
          id: userEmail._id,
        })
      return res.status(200).json({ message: "token generato", jwt })
    }
  }
  return res.status(400).json({ message: "email o password errata" })
}