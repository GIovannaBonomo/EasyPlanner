import express from 'express';
import { authVerify } from "../middleware/authVerify.js";
import { clientId, createClient, deleteClient, getClient, putClient } from '../controllers/client.js';

const clientRouter = express.Router();

clientRouter.use(authVerify)

clientRouter.post("/", createClient);
clientRouter.get("/", getClient)
clientRouter.get('/:id', clientId)
clientRouter.put('/:id', putClient)
clientRouter.delete('/:id', deleteClient)

export default clientRouter;