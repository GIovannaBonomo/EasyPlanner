import { verifyJwt } from "../helpers/jwt.js";
import User from "../models/User.js";


export async function authVerify(req, res, next){
    const headerAuth= req.headers.authorization || " ";
    const token= headerAuth.replace("Bearer ", "")
    if(!token){
        res.status(401).json({ message: "token mancante"})
    } 
    try{
        const payload= verifyJwt(token)
        const user= await User.findById(payload.id)
        if(!user) return res.status(401).json({message: "utente non verificato"})
            req.user= user
        next()
    } catch(error){
        res.status(401).json({message: "token scaduto o non valido"})
    }
}