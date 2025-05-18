import { Router } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import institutionRoutes from "./institution.routes";
import ticketRoutes from "./ticket.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/institutions", institutionRoutes);
router.use("/categories", categoryRoutes);
router.use("/tickets", ticketRoutes);

export default router;
