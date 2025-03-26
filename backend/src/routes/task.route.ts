import express, { Router } from "express";

import { protectAccess } from "../middlewares/protectAccess.middleware";

export const taskRouter: Router = express.Router();

taskRouter.post("", protectAccess, );

taskRouter.get("/user", protectAccess,);
