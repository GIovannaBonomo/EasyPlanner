import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        number: {type: Number, required: true}
    }
)

const Client = mongoose.model("Client", ClientSchema);

export default Client;