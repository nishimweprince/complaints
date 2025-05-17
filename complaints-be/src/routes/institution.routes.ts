import { Router } from "express";
import { InstitutionController } from "../controllers/institution.controller";

// LOAD CONTROLLERS
const institutionController = new InstitutionController();

const institutionRoutes = Router();

// FETCH INSTITUTIONS
institutionRoutes.get("/", institutionController.fetchInstitutions);

// CREATE INSTITUTION
institutionRoutes.post("/", institutionController.createInstitution);

export default institutionRoutes;
