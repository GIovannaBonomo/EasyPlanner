import mongoose from "mongoose";
import Service from "../models/Service.js"

export async function getService(req, res) {
    try {
        const service = await Service.find()
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({ message: "Errore nel caricamento dei servizi", error })
    }
}

export async function createService(req, res) {
    try {
        const { name, duration, price} = req.body;
        const newService = new Service(
            { name, duration, price }
        )
        const serviceSaved = await newService.save();
        res.status(201).json(serviceSaved)
    } catch (error) {
        res.status(500).json({ message: "Errore nel creare il servizio", error })
    }
}

export async function serviceId(req, res) {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
  return res.status(404).json({ message: "Servizio non trovato" });
}
res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: "errore nel recupero del servizio", error })
    }
}

export async function putService(req, res) {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Id servizio non valido"})
        }
        const {name, duration, price} = req.body;
        const serviceUpdate = await Service.findByIdAndUpdate(
            id,
            {name, duration, price},
            {new: true}
        );

        if(!serviceUpdate){
            return res.status(400).json({message:"servizio non trovato"})
        }
        res.status(200).json(serviceUpdate)
    }catch(error){
res.status(500).json({message: "errore nell'aggiornare il servizio"})
    }
}

export async function deleteService(req, res) {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "id servizio non valido"})
        }
        const deletedService = await Service.findByIdAndDelete(id);
        if(!deletedService){
            return res.status(404).json({message:("servizio non trovato")})
        }
        res.status(200).json({message:"servizio eliminato", deletedService})
    }
    catch(error){
        res.status(500).json({message: "errore nell'eliminazione del servizio", error})
    }
}
