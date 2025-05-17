import { NextFunction, Request, Response } from "express";
import { InstitutionService } from "../services/institution.service";

// LOAD SERVICES
const institutionService = new InstitutionService();

export class InstitutionController {
  /**
   * CREATE INSTITUTION
   */
  async createInstitution(req: Request, res: Response, next: NextFunction) {
    try {
      const { institution, admin } = req.body;
      const newInstitution = await institutionService.createInstitution({
        institution,
        admin,
      });
      return res
        .status(201)
        .json({ message: "Institution created", data: newInstitution });
    } catch (error) {
      next(error);
    }
  }

  /**
   * FETCH INSTITUTIONS
   */
  async fetchInstitutions(req: Request, res: Response, next: NextFunction) {
    try {
      const institutions = await institutionService.fetchInstitutions({
        params: req.query,
      });
      return res.status(200).json({
        message: "Institutions fetched",
        data: institutions,
      });
    } catch (error) {
      next(error);
    }
  }
}
