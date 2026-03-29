import { Router } from "express";
import { registeredCompanies } from "../controllers/admin.controller";

const router=Router()

router.get("/companies",registeredCompanies);

export default router;