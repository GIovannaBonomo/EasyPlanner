import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema(
    {
        client: {type: Schema.Types.ObjectId, ref: "Client", required: true},
        service: {type: Schema.Types.ObjectId, ref: "Service", required: true},
        start: {type: Date, required: true},
        end: {type: Date, required: true},
        notes: {type: String}
    },
    {timestamps: true}
)

const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
