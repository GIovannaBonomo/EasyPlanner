import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema(
    {
        name: {type: String, required: true},
        duration: {type: Number, required: true},
        price: {type: Number, required: true}
   }
)

const Service = mongoose.model("Service", ServiceSchema)

export default Service;