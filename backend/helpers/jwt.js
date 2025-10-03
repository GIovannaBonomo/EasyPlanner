import jwt from "jsonwebtoken";

export async function signJwt(payLoad){
    return jwt.sign(payLoad, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRESIN
    })
}

export function verifyJwt(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}