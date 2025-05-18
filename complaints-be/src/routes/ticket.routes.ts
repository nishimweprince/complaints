import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

// LOAD CONTROLLERS
const ticketController = new TicketController();

const ticketRoutes = Router();

// CREATE TICKET
ticketRoutes.post("/", ticketController.createTicket);

// GET TICKET
ticketRoutes.get("/:id", ticketController.getTicket);

// DELETE TICKET
ticketRoutes.delete("/:id", authMiddleware, ticketController.deleteTicket);

export default ticketRoutes;
