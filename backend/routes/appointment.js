import express from 'express';
import { authVerify } from '../middleware/authVerify.js';
import { appointmentId, createAppointment, deleteAppointment, getAppointment, putAppointment } from '../controllers/appointment.js';

const appointmentRouter = express.Router();

appointmentRouter.use(authVerify)

appointmentRouter.post("/", createAppointment)
appointmentRouter.get("/", getAppointment)
appointmentRouter.get("/:id", appointmentId)
appointmentRouter.put("/:id", putAppointment)
appointmentRouter.delete("/:id", deleteAppointment)

export default appointmentRouter;