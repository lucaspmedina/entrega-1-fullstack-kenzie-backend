import { Router } from "express";
import { loginClientsController } from "../controllers/login.controller";

const loginRouter = Router();

loginRouter.post("", loginClientsController);

export { loginRouter };
