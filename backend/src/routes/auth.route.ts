import express, { Router } from "express";
import {
	signup,
	login,
	getAllUsers,
	logout,
	checkAuth,
} from "../controllers/auth";
import { protectAccess } from "../middlewares/protectAccess.middleware";

export const authRouter: Router = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/users", getAllUsers);

// authRouter.put("/profile", protectRoute, updateProfile);

authRouter.get("/user", protectAccess, checkAuth);
