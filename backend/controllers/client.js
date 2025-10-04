import mongoose from "mongoose";
import Client from "../models/Client.js";

export async function getClient(req, res) {
    try {
        const client = await Client.find()
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({ message: "Errore nel caricamento dei clienti", error })
    }
}

export async function createClient(req, res) {
    try {
        const { name, email, number } = req.body;
        const newClient = new Client(
            { name, email, number }
        )
        const clientSaved = await newClient.save();
        res.status(201).json(clientSaved)
    } catch (error) {
        res.status(500).json({ message: "Errore nel creare il cliente", error })
    }
}

export async function clientId(req, res) {
    try {
        const { id } = req.params;
        const client = await Client.findById(id);
        if (!client) {
  return res.status(404).json({ message: "Cliente non trovato" });
}
res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: "errore nel recupero del cliente", error })
    }
}

export async function putClient(req, res) {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Id cliente non valido"})
        }
        const {name, email, number} = req.body;
        const clientUpdate = await Client.findByIdAndUpdate(
            id,
            {name, email, number},
            {new: true}
        );

        if(!clientUpdate){
            return res.status(400).json({message:"cliente non trovato"})
        }
        res.status(200).json(clientUpdate)
    }catch(error){
res.status(500).json({message: "errore nell'aggiornare il cliente"})
    }
}

export async function deleteClient(req, res) {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "id autore non valido"})
        }
        const deletedClient = await Client.findByIdAndDelete(id);
        if(!deletedClient){
            return res.status(404).json({message:("cliente non trovato")})
        }
        res.status(200).json({message:"cliente eliminato", deletedClient})
    }
    catch(error){
        res.status(500).json({message: "errore nell'eliminazione del cliente", error})
    }
}