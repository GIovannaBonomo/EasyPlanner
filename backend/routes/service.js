import express from 'express';
import { authVerify } from '../middleware/authVerify.js';
import { createService, deleteService, getService, putService, serviceId } from '../controllers/service.js';

const serviceRouter = express.Router();

serviceRouter.use(authVerify)

serviceRouter.post("/", createService)
serviceRouter.get("/", getService)
serviceRouter.get("/:id", serviceId)
serviceRouter.put("/:id", putService)
serviceRouter.delete("/:id", deleteService)

export default serviceRouter;
