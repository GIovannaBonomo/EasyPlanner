import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String},
        name: {type: String},
        googleId: {type: String, required: false, unique: true},
    }
)

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    try{
        const salt= await bcrypt.genSalt(10) 
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(error){
        next(error)
    }
})

UserSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", UserSchema);

export default User;