import mongoose from "mongoose";
import Appointment from "../models/Appointment.js"
import mailer from "../helpers/mailer.js";

export async function getAppointment(req, res) {
    try {
        const appointment = await Appointment.find().populate("client", "name email number").populate("service", "name duration price")
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({ message: "Errore nel caricamento degli appuntamenti", error })
    }
}

export async function appointmentId(req, res) {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id).populate("client").populate("service");
        if (!appointment) {
            return res.status(404).json({ message: "appuntamento non trovato" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "errore nel recupero dell'appuntamento", error })
    }
}

export async function createAppointment(req, res) {
    try {
        const { client, service, start, end, notes } = req.body;
        const newAppointment = new Appointment({
            client,
            service,
            start: new Date(start),
            end: new Date(end),
            notes
        });
        const appointmentSaved = await newAppointment.save();
        const populatedAppointment = await Appointment.findById(appointmentSaved._id)
            .populate("client", "name email number")
            .populate("service", "name duration price");

        res.status(201).json(populatedAppointment);

        mailer.sendMail({
            from: '"Easy Planner" <noreply@easyplanner.com>',
            to: populatedAppointment.client.email,
            subject: 'Appuntamento confermato!',
            text: `Gentile ${populatedAppointment.client.name}, il tuo appuntamento è confermato! ${populatedAppointment.service.name} il ${new Date(start).toLocaleString()}.`,
            html: `Gentile ${populatedAppointment.client.name}, il tuo appuntamento è confermato! <b>${populatedAppointment.service.name}</b> il ${new Date(start).toLocaleString()}.`
        }).catch(err => {
            console.error("Errore nell'invio dell'email:", err.message);
        });

    } catch (error) {
        console.error("Errore nel creare l'appuntamento:", error);
        res.status(500).json({ message: "Errore nel creare l'appuntamento", error });
    }
}

export async function putAppointment(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Id appuntamento non valido" })
        }
        const { client, service, start, end, notes, createdBy } = req.body;
        const appointmentUpdate = await Appointment.findByIdAndUpdate(
            id,
            { client, service, start, end, notes, createdBy },
            { new: true }
        );

        if (!appointmentUpdate) {
            return res.status(400).json({ message: "appuntamento non trovato" })
        }
        res.status(200).json(appointmentUpdate)
    } catch (error) {
        res.status(500).json({ message: "errore nell'aggiornare l'appuntamento" })
    }
}

export async function deleteAppointment(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "id appuntamento non valido" })
        }
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: ("appuntamentiìo non trovato") })
        }
        res.status(200).json({ message: "appuntamento eliminato", deletedAppointment })
    }
    catch (error) {
        res.status(500).json({ message: "errore nell'eliminazione dell'appuntamento", error })
    }
}